import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {LedgerListComponent} from './component/ledger-list.component';
import {LedgerComponent} from "./component/ledger.component";

export const routes: Routes = [
  { path: '', component: LedgerListComponent, pathMatch: 'full' },
  { path: 'ledgers', component: LedgerListComponent},
  { path: 'ledger/:id', component: LedgerComponent},
  { path: '**', component: LedgerListComponent}
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})

export class LedgerRouteModule { }

