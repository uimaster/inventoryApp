import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'login', loadChildren: 'app/auth/auth.module#AuthModule' },
    { path: 'masters', loadChildren: 'app/masters/masters.module#MastersModule' },
    { path: 'bill-material', loadChildren: 'app/bill-material/bill-material.module#BillMaterialModule' },
    { path: 'planning', loadChildren: 'app/planning/planning.module#PlanningModule' },
    { path: 'purchase', loadChildren: 'app/purchase/purchase.module#PurchaseModule' },
    { path: 'stores', loadChildren: 'app/stores/stores.module#StoresModule' },
    { path: 'production', loadChildren: 'app/production/production.module#ProductionModule' },
    { path: 'sales', loadChildren: 'app/sales/sales.module#SalesModule' },
    { path: 'utilities', loadChildren: 'app/utilities/utilities.module#UtilitiesModule' },
    { path: 'reports', loadChildren: 'app/reports/reports.module#ReportsModule' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class AppRouteModule {}
