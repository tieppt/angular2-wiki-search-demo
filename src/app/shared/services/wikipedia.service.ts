import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class WikipediaService {

  constructor(private jsonp: Jsonp) { }

  search(terms: Observable<string>, debounceMs = 400) {
    return terms.debounceTime(debounceMs)
      .distinctUntilChanged()
      .switchMap((term: string) => this._search(term))
  }

  _search(term: string) {
    let wikiUrl = 'http://en.wikipedia.org/w/api.php';
    let params = new URLSearchParams();
    params.set('search', term);
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');
    return this.jsonp
      .get(wikiUrl, {search: params})
      .map((res) => <string[]>res.json()[1]);
  }

}
