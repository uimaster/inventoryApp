import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {UnitListComponent} from './component/unit-list.component';

export const routes: Routes = [
  { path: '', component: UnitListComponent},
  { path: 'units', component: UnitListComponent
    // children: [
    //   { path: '/:id',
    //     component: StockDetailComponent,
    //     data: {
    //       shouldDetach: true, // Route will be resused. See CustomResuseStrategy.
    //       title: null
    //     }
    //   }
    // ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class UnitRouteModule { }
