import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, switchMap, map, filter} from 'rxjs/operators';
import { StocksService } from '../stocks.service';
@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.page.html',
  styleUrls: ['./stock-detail.page.scss'],
})
export class StockDetailPage implements OnInit {

  stock: any;
  private onDestroy$ = new Subject();

  constructor(private router: Router, private route: ActivatedRoute,public stocksService: StocksService) { }

  ngOnInit() {
    this.route.params.pipe(
      takeUntil(this.onDestroy$),
      filter(params => !!params.id),
      switchMap(params => this.getStock(params.id))
    ).subscribe(stock => this.stock = stock);
  }

  getStock(id) {
    const [name, market] = id.split(':');
    return this.stocksService.getData().pipe(
      map(data => data.filter(item => item.market === market && item.name === name)),
      map(data => data[0])
    );
  }

  back() {
    this.router.navigateByUrl('/stocks-list')
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
