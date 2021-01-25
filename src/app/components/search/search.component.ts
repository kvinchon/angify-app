import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/models/artist';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SpotifyService]
})
export class SearchComponent {
  searchStr: string;
  artists: Artist[];

  constructor(private spotifyService: SpotifyService) {
    this.artists = [];
  }

  // retrieves the artists matching the search
  searchArtist() {
    this.spotifyService.searchArtist(this.searchStr)
    .subscribe(data => {
      this.artists = data['artists']['items'];
    });
  }
  
}
