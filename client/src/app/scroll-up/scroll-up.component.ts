import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-up',
  templateUrl: './scroll-up.component.html',
  styleUrls: ['./scroll-up.component.css']
})
export class ScrollUpComponent implements OnInit {

  showScrollUpButton: boolean = false;

  constructor() { }

  ngOnInit(): void {
    window.onscroll = () => {
      if (window.scrollY == 0) this.showScrollUpButton = false;
      else this.showScrollUpButton = true;
    }
  }

  scrollUp() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
