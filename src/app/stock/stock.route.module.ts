import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { StockItemComponent } from './component/stock-item.component';
import {StockDetailComponent} from './component/stock-detail.component';

export const routes: Routes = [
  { path: '', component: StockItemComponent },
  { path: 'stocks', component: StockItemComponent,
    children: [
      { path: '', component: StockDetailComponent},
      { path: 'stocks/:id', component: StockDetailComponent}
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})

export class StockRouteModule {}


