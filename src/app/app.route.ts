import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LoginComponent } from '../app/auth/component/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RestPasswordComponent } from './dump-components/reset-password/rest-password.component';
import { OrderlistComponent } from './dump-components/orderlist/orderlist.component';
import { PurchaseComponent } from './dump-components/purchase/purchase.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'resetpassword', component: RestPasswordComponent },
    { path: 'orderlist', component: OrderlistComponent },
    { path: 'purchase', component: PurchaseComponent },
    {path: '**', component: LoginComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
