import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})

export class TopBarComponent {

  @Input() loggedin: boolean = false;

  logout() {
    sessionStorage.clear();
    window.location.href = "http://localhost:4200";
  }
  
}
