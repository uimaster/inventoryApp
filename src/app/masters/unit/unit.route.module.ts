import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {UnitListComponent} from './component/unit-list.component';
import {UnitComponent} from "./component/unit.component";

export const routes: Routes = [
  { path: '', component: UnitListComponent},
  { path: 'units', component: UnitListComponent},
  { path: 'unit/:id', component: UnitComponent},
  { path: '**', component: UnitListComponent}
  
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class UnitRouteModule { }
