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
    if (!item.eps) {
      item.pe_ratio = 0;
      return item;
    }
    item.pe_ratio = parseInt((item.value / item.eps).toString(), 10);
    return item;
  }
}
