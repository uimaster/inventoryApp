import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {StockGroupListComponent} from './component/stock-group-list.component';
import {StockGroupComponent} from "./component/stock-group.component";

export const routes: Routes = [
  { path: '', component: StockGroupListComponent},
  { path: 'stock-groups', component: StockGroupListComponent},
  { path: 'stock-group/:id', component: StockGroupComponent},
  { path: '**', component: StockGroupListComponent}
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule]
})
export class StockGroupRouteModule { }
