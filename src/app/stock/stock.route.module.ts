import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { StockItemComponent } from './component/stock-item.component';
import {StockDetailComponent} from './stock-details/stock-detail.component';

export const routes: Routes = [
  { path: '', component: StockItemComponent, pathMatch: 'full' },
  { path: 'stocks', component: StockItemComponent},
  { path: 'stock-details/:id', component: StockDetailComponent},
  { path: '**', component: StockItemComponent}
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})

export class StockRouteModule {}


