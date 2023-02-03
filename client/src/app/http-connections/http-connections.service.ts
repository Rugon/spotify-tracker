import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttpConnectionsService {

  constructor(private httpClient: HttpClient) {}

  backendBaseUrl = "http://localhost:3000"; // Para ejecución en local

  login(code: string) {
    let path = this.backendBaseUrl + '/login/' + code;
    return this.httpClient.get<any>(path, {});
  }

  userData(access_token: string) {
    let path = this.backendBaseUrl + '/userData';
    let body = { access_token: access_token };
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.httpClient.post<any>(path, body, { headers: headers });
  }

  topSongs(access_token: string, range: string) {
    let path = this.backendBaseUrl + '/top/songs/' + range + '_term';
    let body = { access_token: access_token };
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.httpClient.post<any>(path, body, { headers: headers });
  }

  topArtists(access_token: string, range: string) {
    let path = this.backendBaseUrl + '/top/artists/' + range + '_term';
    let body = { access_token: access_token };
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.httpClient.post<any>(path, body, { headers: headers });
  }

  userPlaylists(access_token: string) {
    let path = this.backendBaseUrl + '/playlist/getAll';
    let body = { access_token: access_token };
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.httpClient.post<any>(path, body, { headers: headers });
  }

  explorePlaylist(access_token: string, id: string) {
    let path = this.backendBaseUrl + '/playlist/get/' + id;
    let body = { access_token: access_token };
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.httpClient.post<any>(path, body, { headers: headers });
  }

  getNextTracks(access_token: string, url: string) {
    let path = this.backendBaseUrl + '/playlist/getNextTracks';
    let body = { access_token: access_token, url: url };
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.httpClient.post<any>(path, body, { headers: headers });
  }

}
