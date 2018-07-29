import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders, Component } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RestPasswordComponent } from './dump-components/reset-password/rest-password.component';
import { OrderlistComponent } from './dump-components/orderlist/orderlist.component';
import { PurchaseComponent } from './dump-components/purchase/purchase.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    { path: 'login', loadChildren: 'app/auth/auth.module#AuthModule' },
    { path: 'stocks', loadChildren: 'app/stock/stock.module#StockModule' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'resetpassword', component: RestPasswordComponent },
    { path: 'orderlist', component: OrderlistComponent },
    { path: 'purchase', component: PurchaseComponent },
    { path: '**', component: DashboardComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
