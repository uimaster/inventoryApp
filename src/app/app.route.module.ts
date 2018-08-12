import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { RestPasswordComponent } from './dump-components/reset-password/rest-password.component';
// import { OrderlistComponent } from './dump-components/orderlist/orderlist.component';
// import { PurchaseComponent } from './dump-components/purchase/purchase.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'login', loadChildren: 'app/auth/auth.module#AuthModule' },
    { path: 'masters', loadChildren: 'app/masters/masters.module#MastersModule' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class AppRouteModule {}
