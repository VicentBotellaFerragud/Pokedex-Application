import { AfterContentChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentChecked {

  title = 'Pokedex-Application';

  path: string = '';

  constructor(private router: Router) { }


  ngAfterContentChecked(): void { //Works better than ngOnInit or ngAfterViewInit. These last two functions are called too fast 
                                  //for the app to read the current path correctly.
    this.checkPath();

  }

  checkPath() {

    this.path = this.router.url;
   
  }

}
