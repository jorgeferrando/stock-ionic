import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockDetailPage } from './stock-detail.page';

const routes: Routes = [
  {
    path: ':id',
    component: StockDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockDetailPageRoutingModule {}
