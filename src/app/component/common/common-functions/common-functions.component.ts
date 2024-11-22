import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-common-functions',
  templateUrl: './common-functions.component.html',
  styleUrls: ['./common-functions.component.css'],
})
export class CommonFunctionsComponent {
  constructor(public router: Router) {}

  ngOnInit(): void {}

  reloadComponent(self: boolean, urlToNavigateTo?: string) {
    //skipLocationChange:true means dont update the url to / when navigating
    console.log('Current route I am on:', this.router.url);
    const url = self ? this.router.url : urlToNavigateTo;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/${url}`]).then(() => {
        console.log(`After navigation I am on:${this.router.url}`);
      });
    });
  }

  reloadPage() {
    window.location.reload();
  }
}
