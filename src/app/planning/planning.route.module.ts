import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanningComponent } from './planning.component';
import { PlanningListComponent } from './planning-list.component';
import { CreateComponent } from './create/create.component';

export const routes: Routes = [
  { path: '',  component: PlanningComponent,
    children: [
        {
            path: '', children: [
                { path: 'list/:type', component: PlanningListComponent },
                { path: 'add/:type', component: CreateComponent},
                { path: ':type/:id', component: CreateComponent},
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

export class PlanningRouteModule { }
