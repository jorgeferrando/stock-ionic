import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'stocks-list',
    loadChildren: () => import('./stocks-list/stocks-list.module').then( m => m.StocksListPageModule)
  },
  {
    path: '',
    redirectTo: 'stocks-list',
    pathMatch: 'full'
  },
  {
    path: 'stock-detail',
    loadChildren: () => import('./stock-detail/stock-detail.module').then( m => m.StockDetailPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
