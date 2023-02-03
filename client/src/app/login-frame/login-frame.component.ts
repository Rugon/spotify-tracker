import { Component, Input } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login-frame',
  templateUrl: './login-frame.component.html',
  styleUrls: ['./login-frame.component.css']
})

export class LoginFrameComponent {

  @Input() loggedin: boolean = false;

  constructor() { }

  login() {

    // OAuth desde frontend

    let client_id = '6da5e9fa43aa458d89979bbb1d7dba31';
    let redirect_uri = 'http://localhost:4200';

    let path = 'https://accounts.spotify.com/authorize?';
    let params = new HttpParams()
      .set('response_type', 'code')
      .set('client_id', client_id)
      .set('scope', 'user-read-private user-read-email user-top-read')
      .set('redirect_uri', redirect_uri);

    let url = path + params.toString();

    window.location.href = url;

  }
  
}
