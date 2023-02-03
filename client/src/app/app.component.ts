import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpConnectionsService } from './http-connections/http-connections.service';
import { DataFrameComponent } from './data-frame/data-frame.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {

  constructor(private route: ActivatedRoute, private httpConnectionsService: HttpConnectionsService) {}

  @ViewChild(DataFrameComponent) dataFrame: DataFrameComponent;

  loggedin: boolean = false; // Este valor pasa por medio de @Input a login-frame.component

  ngAfterViewInit() {
    this.route.queryParams.subscribe(params => {
      let code = params['code'];
      if (code === undefined) {
        if (sessionStorage.getItem('loggedin') == 'true') {
          this.dataFrame.loadUserData();
          this.loggedin = true;
        } else {
          this.loggedin = false;
        }
      } else {
        this.login(code);
      }
    });
  }

  login(code: string) {
    this.httpConnectionsService.login(code).subscribe({
      next: (data) => {
        if (data.loggedin === true) {
          sessionStorage.setItem('loggedin', 'true');
          sessionStorage.setItem('access_token', data.access_token);
          window.location.href = "http://localhost:4200";
        } else {
          alert('Login error');
        }
      },
      error: () => alert('Login error')
    });
  }

}
