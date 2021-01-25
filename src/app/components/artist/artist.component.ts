import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { Artist } from 'src/app/models/artist';
import { Album } from 'src/app/models/album';

@Component({
  selector: 'artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css'],
  providers: [SpotifyService]
})
export class ArtistComponent implements OnInit {
  id: string;
  artist: Artist;
  albums: Album[];

  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute
  ) { }
  
  // retrieves artist information and albums
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.spotifyService.getArtistById(this.id).subscribe(data => {
      this.artist = {
        id: data['id'],
        name: data['name'],
        type: data['type'],
        followers: data['followers']['total'],
        genres: data['genres'],
        images: data['images']
      }
    });

    this.spotifyService.getAlbumsByArtistId(this.id).subscribe(data => {
      this.albums = data['items'];
      this.albums.forEach(album => {
        album.release_date = new Date(album.release_date).toLocaleDateString('en-US', {year: 'numeric'});
      })
    })
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
