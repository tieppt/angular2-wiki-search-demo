import { Component } from '@angular/core';
import { WikipediaService } from './shared/index';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WikipediaService]
})
export class AppComponent {
  items: Array<string>;
  term$ = new Subject<string>();
  constructor(private service: WikipediaService) {
    this.service.search(this.term$)
      .subscribe((res: Array<string>) => this.items = res);
  }
}
