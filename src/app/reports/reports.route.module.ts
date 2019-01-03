import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { ReportsListComponent } from './reports-list.component';

export const routes: Routes = [
  { path: '',  component: ReportsComponent,
    children: [
        {
            path: '', children: [
                { path: 'list/:type', component: ReportsListComponent }
            ]
        }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})

export class ReportsRouteModule { }
