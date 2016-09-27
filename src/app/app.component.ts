import { Component } from '@angular/core';
import { WikipediaService } from './shared/index';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';

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
    this.term$.subscribe((term) => this.search(term));
  }
  search(term: string) {
    this.service.search(term)
      .subscribe(res => this.items = res);
  }
}
