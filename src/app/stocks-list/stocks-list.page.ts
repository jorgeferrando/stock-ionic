import { Component, OnInit } from '@angular/core';
import { StocksService } from '../stocks.service';

@Component({
  selector: 'app-stocks-list',
  templateUrl: './stocks-list.page.html',
  styleUrls: ['./stocks-list.page.scss'],
})
export class StocksListPage implements OnInit {
  public data = null;
  
  constructor(public stocksService: StocksService) { }

  ngOnInit() {
    this.stocksService.getData().subscribe(_data => this.data = _data);
  }

}
