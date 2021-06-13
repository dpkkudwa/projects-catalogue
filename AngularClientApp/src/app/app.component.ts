import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Project Catalogue';
  sideBarOpen = true;

  constructor() {
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
