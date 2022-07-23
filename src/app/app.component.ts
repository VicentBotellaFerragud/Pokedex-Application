import { AfterContentChecked, Component } from '@angular/core';
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

  /**
   * Calls the checkPath function. Apparently ngAfterContentChecked works better than ngOnInit or ngAfterViewInit. It seems that these
   * last two functions are called too fast for the app to read the current path currently.
   */
  ngAfterContentChecked(): void { 

    this.checkPath();

  }

  /**
   * Checks the url path and gives its value to the local variable 'path'.
   */
  checkPath() {

    this.path = this.router.url;
   
  }

}
