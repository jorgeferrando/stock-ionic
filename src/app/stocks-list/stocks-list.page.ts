import { Component, OnInit } from '@angular/core';
import { StocksService } from '../stocks.service';
import { FormControl } from '@angular/forms';
import { Subject, fromEventPattern } from 'rxjs';
import { takeUntil, distinctUntilChanged, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-stocks-list',
  templateUrl: './stocks-list.page.html',
  styleUrls: ['./stocks-list.page.scss'],
})
export class StocksListPage implements OnInit {
  public data = [];
  public filteredData = [];
  public searchFormControl = new FormControl('');
  private onDestroy$ = new Subject();
  constructor(public stocksService: StocksService) { }

  ngOnInit() {
    this.stocksService.getData().subscribe(_data => {
      this.data = _data
      const keys = Object.keys(this.data);
      this.filteredData = keys.map(key => this.data[key]);
    });
    this.searchFormControl.valueChanges.pipe(
      startWith(''),
      takeUntil(this.onDestroy$),
      distinctUntilChanged()
    ).subscribe(query => {
      if (query === '') {
        this.filteredData = Object.keys(this.data).map(key => this.data[key]); 
        return;
      }
      const keys = Object.keys(this.data);
      this.filteredData = keys.filter(this.selectIfQueryMatches(query)).map(key => this.data[key]);
    });
  }

  selectIfQueryMatches(query) {
    const _query = query.toLowerCase();
    return (key) => {
      if(!this.filteredData.length) {
        return true;
      }
        return this.data[key].title.toLowerCase().includes(_query)
        || this.data[key].name.toLowerCase().includes(_query)
        || this.data[key].market.toLowerCase().includes(_query);
    };
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  trackByStock(index: number, stock: any) {
    return stock.name;
  }
}
