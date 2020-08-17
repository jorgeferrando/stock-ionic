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
      this.filteredData = this.data;
    });
    this.searchFormControl.valueChanges.pipe(
      startWith(''),
      takeUntil(this.onDestroy$),
      distinctUntilChanged()
    ).subscribe(query => {
      if (query === '') {
        this.filteredData = this.data;
        return;
      }
      this.filteredData = this.data.filter(this.selectIfQueryMatches(query));
    });
  }

  selectIfQueryMatches(query) {
    const _query = query.toLowerCase();
    return (item) => {
      if(!this.filteredData.length) {
        return true;
      }
        return item.title.toLowerCase().includes(_query)
        || item.name.toLowerCase().includes(_query)
        || item.market.toLowerCase().includes(_query);
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
