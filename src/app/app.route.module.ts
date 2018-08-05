import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RestPasswordComponent } from './dump-components/reset-password/rest-password.component';
import { OrderlistComponent } from './dump-components/orderlist/orderlist.component';
import { PurchaseComponent } from './dump-components/purchase/purchase.component';

export const routes: Routes = [
    { path: 'login', loadChildren: 'app/auth/auth.module#AuthModule' },
    { path: 'stocks', loadChildren: 'app/stock/stock.module#StockModule' },
    { path: 'stock-groups', loadChildren: 'app/stock-group/stock-group.module#StockGroupModule' },
    { path: 'units', loadChildren: 'app/unit/unit.module#UnitModule'},
    { path: 'ledgers', loadChildren: 'app/ledger/ledger.module#LedgerModule' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'resetpassword', component: RestPasswordComponent },
    { path: 'orderlist', component: OrderlistComponent },
    { path: 'purchase', component: PurchaseComponent },
    { path: '**', loadChildren: 'app/auth/auth.module#AuthModule'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class AppRouteModule {}
