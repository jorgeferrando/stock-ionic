import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StocksListPageRoutingModule } from './stocks-list-routing.module';

import { StocksListPage } from './stocks-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    StocksListPageRoutingModule
  ],
  declarations: [StocksListPage]
})
export class StocksListPageModule {}
