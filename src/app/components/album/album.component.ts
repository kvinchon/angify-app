import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Album } from 'src/app/models/album';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Howl } from 'howler';

@Component({
  selector: 'album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
  providers: [SpotifyService],
})
export class AlbumComponent implements OnInit {
  id: string;
  album: Album;
  track: Howl;
  currentlyPlaying: string;

  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // stops the player when the user changes page
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd && this.track) {
        this.track.stop();
      }
    });
  }

  // retrieves album
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.spotifyService.getAlbumById(this.id).subscribe((data) => {
      this.album = {
        id: data['id'],
        name: data['name'],
        type: data['type'],
        release_date: new Date(data['release_date']).toLocaleDateString('en-US', {year: 'numeric'}),
        images: data['images'],
        artists: data['artists'],
        tracks: data['tracks'],
      };
    });
  }

  // converts track duration time to minutes and seconds
  millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = parseInt(((millis % 60000) / 1000).toFixed(0));
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  // displays the player and starts the song
  playTrack(name, url) {
    var player = document.getElementById('player');
    var btnPlay = document.getElementById('btn-play');
    var btnPause = document.getElementById('btn-pause');

    player.style.display = 'flex';

    var track = new Howl({
      src: [url],
      format: 'mp3',
      volume: 0.5,
      onplay: function () {
        btnPlay.style.display = 'none';
        btnPause.style.display = 'block';
      },
      onpause: function () {
        btnPlay.style.display = 'block';
        btnPause.style.display = 'none';
      },
      onend: function () {
        btnPause.style.display = 'none';
        btnPlay.style.display = 'block';
      },
    });

    // if a song is already played we stop it
    if (this.track) {
      this.track.stop();
    }

    track.play();

    this.track = track;
    this.currentlyPlaying = name;

    btnPlay.onclick = function () {
      track.play();
    };

    btnPause.onclick = function () {
      track.pause();
    };

    this.visibilityChange(track);
  }

  // mutes the song if the page is hidden (tab change for example)
  visibilityChange(audioElement) {
    let audio = audioElement;
    let hidden = 'hidden';

    // Standards:
    if (hidden in document)
      document.addEventListener('visibilitychange', onchange);
    else if ((hidden = 'mozHidden') in document)
      document.addEventListener('mozvisibilitychange', onchange);
    else if ((hidden = 'webkitHidden') in document)
      document.addEventListener('webkitvisibilitychange', onchange);
    else if ((hidden = 'msHidden') in document)
      document.addEventListener('msvisibilitychange', onchange);
    // All others:
    else
      window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onchange;

    function onchange(evt) {
      let v = false,
        h = true,
        evtMap = {
          focus: v,
          focusin: v,
          pageshow: v,
          blur: h,
          focusout: h,
          pagehide: h,
        };

      evt = evt || window.event;

      let windowHidden = false;
      if (evt.type in evtMap) {
        windowHidden = evtMap[evt.type];
      } else {
        windowHidden = this[hidden];
      }

      if (audio) {
        if (windowHidden) {
          audio.mute(true);
          // howl.mute(true)
        } else {
          audio.mute(false);
          // howl.mute(false)
        }
      }
    }

    // set the initial state (but only if browser supports the Page Visibility API)
    if (document[hidden] !== undefined)
      onchange({
        type: document[hidden] ? 'blur' : 'focus',
      });
  }
}
