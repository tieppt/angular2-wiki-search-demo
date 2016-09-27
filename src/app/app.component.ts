import { Component } from '@angular/core';
import { WikipediaService } from './shared/index';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

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
    this.term$
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap((term: string) => this.service.search(term))
      .subscribe((res: Array<string>) => this.items = res);
  }
}
