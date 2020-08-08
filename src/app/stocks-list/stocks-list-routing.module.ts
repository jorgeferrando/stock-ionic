import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StocksListPage } from './stocks-list.page';

const routes: Routes = [
  {
    path: '',
    component: StocksListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StocksListPageRoutingModule {}
