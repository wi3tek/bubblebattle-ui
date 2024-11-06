import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Awantura o bombelki';
  date = new Date();
  gameName = 'Awantura o bombelki';
  gameId = '6728c94e8399d23bd867baee';

  constructor() {}
}
