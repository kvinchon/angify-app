import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const clientId = 'your_client_id'; // your client id
const clientSecret = 'your_client_secret'; // your client secret
var accessToken;

@Injectable()
export class SpotifyService {
  private authUrl: string;
  private searchUrl: string;
  private artistUrl: string;
  private albumUrl: string;

  constructor(private http: HttpClient) {
    if (!accessToken) {
      this._getToken();
    }
  }

  // retrieves access token
  _getToken() {
    this.authUrl = 'https://accounts.spotify.com/api/token';
    let body = 'grant_type=client_credentials';
    this.http.post(this.authUrl, body, {
      headers: {
        ['Authorization']:
          'Basic ' + btoa(clientId + ':' + clientSecret),
        ['Content-Type']: 'application/x-www-form-urlencoded',
      },
    }).subscribe(data => {
      accessToken = data['access_token'];
    });
  }

  // retrieves artists
  searchArtist(artist: string) {
    this.searchUrl =
      'https://api.spotify.com/v1/search?query=' +
      artist +
      '&offset=0&limit=20&type=artist';
    return this.http.get(this.searchUrl, {
      headers: { ['Authorization']: 'Bearer ' + accessToken },
    });
  }

  // retrieves artist information
  getArtistById(id: string) {
    this.artistUrl = 'https://api.spotify.com/v1/artists/' + id;
    return this.http.get(this.artistUrl, {
      headers: { ['Authorization']: 'Bearer ' + accessToken },
    });
  }

  // retrieves an artist's albums
  getAlbumsByArtistId(artistId: string) {
    this.albumUrl =
      'https://api.spotify.com/v1/artists/' + artistId + '/albums';
    return this.http.get(this.albumUrl, {
      headers: { ['Authorization']: 'Bearer ' + accessToken },
    });
  }

  // retrieve album information
  getAlbumById(id: string) {
    this.albumUrl = 'https://api.spotify.com/v1/albums/' + id;
    return this.http.get(this.albumUrl, {
      headers: { ['Authorization']: 'Bearer ' + accessToken },
    });
  }
}
