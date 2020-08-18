import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class StocksFileReaderService {

  constructor(public http: HttpClient) { 
  }
  getData() {
    return this.http.get('assets/data.json').pipe(
      map(data => Object.keys(data).map(key => data[key])),
      map(data => data.map(this.attachPERatio))
    );
  }
  attachPERatio(item) {
    let eps = 0;
    let value = 0;
    try {
      value = parseFloat(item.value);
      eps = parseFloat(item.eps);
    } catch(e) {
      eps = 0;
    }
    if (!eps || !value) {
      item.pe_ratio = 0;
      return item;
    }
    item.pe_ratio = parseInt((value / eps).toString(), 10);
    return item;
  }
}
