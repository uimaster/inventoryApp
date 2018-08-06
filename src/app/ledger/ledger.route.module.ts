import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {LedgerListComponent} from './component/ledger-list.component';

export const routes: Routes = [
  { path: '', component: LedgerListComponent},
  { path: 'ledgers', component: LedgerListComponent}
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})

export class LedgerRouteModule { }
