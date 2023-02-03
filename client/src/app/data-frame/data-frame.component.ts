import { Component, Input } from '@angular/core';
import { HttpConnectionsService } from '../http-connections/http-connections.service';

@Component({
  selector: 'app-data-frame',
  templateUrl: './data-frame.component.html',
  styleUrls: ['./data-frame.component.css']
})

export class DataFrameComponent {

  @Input() loggedin: boolean = false;

  userData: any = {
    "username": undefined,
    "img": undefined,
    "email": undefined,
    "country": undefined,
    "followers": undefined,
  }

  timeOptions: any[] = [
    { value: 'short', text: 'Last 4 weeks' },
    { value: 'medium', text: 'Last 6 months' },
    { value: 'long', text: 'All time' }
  ];

  loadedData: boolean = false;

  songRangeValue: string = 'short'; // short as default

  showSongs: boolean = false;
  showArtists: boolean = false;
  showPlaylists: boolean = false;
  showPLTracks: boolean = false;

  songsDataSource: any[] = [];
  artistsDataSource: any[] = [];
  playlistsDataSource: any[] = [];
  playlistTracksDataSource: any[] = [];

  columnsToDisplaySongs: string[] = ['num', 'song', 'artist', 'link'];
  columnsToDisplayArtists: string[] = ['num', 'artistName', 'link'];
  columnsToDisplayPlaylists: string[] = ['img', 'playlistName', 'link'];

  selectedPlaylist: any = {
    "img": undefined,
    "name": undefined,
    "link": undefined
  }

  constructor(private httpConnectionsService: HttpConnectionsService) {}

  loadUserData() {

    let access_token = sessionStorage.getItem('access_token');

    if (access_token == null) {

      alert('Load error');

    } else {

      this.httpConnectionsService.userData(access_token).subscribe({
        next: (data) => {
          if (data.data == 'error') {
            alert('Error')
          } else if (data.data == 'token expired') {
            alert('Expired session')
            sessionStorage.clear();
            window.location.href = "http://localhost:4200";
          } else {
            let userInfo = data.data;
            this.userData.username = userInfo.display_name;
            this.userData.img = userInfo.images[0].url;
            this.userData.email = userInfo.email;
            this.userData.country = userInfo.country;
            this.userData.followers = userInfo.followers.total;
            this.loadedData = true;
          }
        },
        error: () => alert('Error en la carga de datos')
      });

    }
  }

  topSongs(timeRange: string) {

    let access_token = sessionStorage.getItem('access_token');

    if (access_token == null) {

      alert('Load error');

    } else {

      this.httpConnectionsService.topSongs(access_token, timeRange).subscribe({
        next: (data) => {
          if (data.data == 'error') {
            alert('Error')
          } else if (data.data == 'token expired') {
            alert('Expired session')
            sessionStorage.clear();
            window.location.href = "http://localhost:4200";
          } else {

            this.songsDataSource = [];

            let list = data.data.items;

            for (let i = 0; i < list.length; i++) {
              this.songsDataSource.push({
                num: i+1,
                name: list[i].name,
                artist: list[i].artists.map((value: any) => value.name).join(', '),
                link: list[i].external_urls.spotify
              })
            }

            this.showArtists = false;
            this.showPlaylists = false;
            this.showPLTracks = false;
            this.showSongs = true;

          }
        },
        error: () => alert('Error en la carga de datos')
      });

    }
    
  }

  topArtists(timeRange: string) {
    
    let access_token = sessionStorage.getItem('access_token');

    if (access_token == null) {

      alert('Load error');

    } else {

      this.httpConnectionsService.topArtists(access_token, timeRange).subscribe({
        next: (data) => {
          if (data.data == 'error') {
            alert('Error')
          } else if (data.data == 'token expired') {
            alert('Expired session')
            sessionStorage.clear();
            window.location.href = "http://localhost:4200";
          } else {

            this.artistsDataSource = [];

            let list = data.data.items;

            for (let i = 0; i < list.length; i++) {
              this.artistsDataSource.push({
                num: i+1,
                name: list[i].name,
                link: list[i].external_urls.spotify
              })
            }

            this.showSongs = false;
            this.showPlaylists = false;
            this.showPLTracks = false;
            this.showArtists = true;

          }
        },
        error: () => alert('Error en la carga de datos')
      });

    }

  }

  userPlaylists() {

    let access_token = sessionStorage.getItem('access_token');

    if (access_token == null) {

      alert('Load error');

    } else {

      this.httpConnectionsService.userPlaylists(access_token).subscribe({
        next: (data) => {
          if (data.data == 'error') {
            alert('Error')
          } else if (data.data == 'token expired') {
            alert('Expired session')
            sessionStorage.clear();
            window.location.href = "http://localhost:4200";
          } else {

            this.playlistsDataSource = [];

            let list = data.data.items;

            for (let i = 0; i < list.length; i++) {
              this.playlistsDataSource.push({
                id: list[i].id,
                img: list[i].images[0].url,
                name: list[i].name,
                link: list[i].external_urls.spotify
              })
            }

            this.showSongs = false;
            this.showArtists = false;
            this.showPLTracks = false;
            this.showPlaylists = true;

          }
        },
        error: () => alert('Error en la carga de datos')
      });
    
    }

  }

  clickPlaylist(data: any, event: any) {
    if (event.target.className != 'spotify-icon') {
      this.explorePlaylist(data);
    }
  }

  explorePlaylist(data: any) {

    this.selectedPlaylist.name = data.name;
    this.selectedPlaylist.img = data.img;
    this.selectedPlaylist.link = data.link;

    let access_token = sessionStorage.getItem('access_token');

    if (access_token == null) {

      alert('Load error');

    } else {

      this.httpConnectionsService.explorePlaylist(access_token, data.id).subscribe({
        next: (data) => {
          if (data.data == 'error') {
            alert('Error')
          } else if (data.data == 'token expired') {
            alert('Expired session')
            sessionStorage.clear();
            window.location.href = "http://localhost:4200";
          } else {

            let trackList = data.data.items;

            this.playlistTracksDataSource = [];

            for (let i = 0; i < trackList.length; i++) {
              this.playlistTracksDataSource.push({
                num: i+1,
                name: trackList[i].track.name,
                artist: trackList[i].track.artists.map((value: any) => value.name).join(', '),
                link: trackList[i].track.external_urls.spotify
              })
            }

            if (data.data.next == null) {
              this.showPlaylistTracks();
            } else {
              this.getNextTracks(data.data.next);
            }

          }
        },
        error: () => alert('Error en la carga de datos')
      });
    
    }

  }

  getNextTracks(path: string) {

    let access_token = sessionStorage.getItem('access_token');

    if (access_token == null) {

      alert('Load error');

    } else {

      this.httpConnectionsService.getNextTracks(access_token, path).subscribe({
        next: (data) => {
          if (data.data == 'error') {
            alert('Error')
          } else if (data.data == 'token expired') {
            alert('Expired session')
            sessionStorage.clear();
            window.location.href = "http://localhost:4200";
          } else {

            let idx = this.playlistTracksDataSource.length;

            let trackList = data.data.items;

            for (let i = 0; i < trackList.length; i++) {
              this.playlistTracksDataSource.push({
                num: idx + i,
                name: trackList[i].track.name,
                artist: trackList[i].track.artists.map((value: any) => value.name).join(', '),
                link: trackList[i].track.external_urls.spotify
              })
            }

            if (data.data.next != null) {
              this.getNextTracks(data.data.next)
            } else {
              this.showPlaylistTracks();
            }

          }
        },
        error: () => alert('Error en la carga de datos')
      });

    }

  }

  showPlaylistTracks() {
    this.showSongs = false;
    this.showArtists = false;
    this.showPlaylists = false;
    this.showPLTracks = true;
  }

}
