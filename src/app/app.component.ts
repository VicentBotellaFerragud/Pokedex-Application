import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Pokedex-Application';

  path: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkPath();
  }

  checkPath() {
    setTimeout(() => {
      this.path = this.router.url;
    }, 250);
  }

}
