import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { SharedModule } from './../shared/shared.module';
import { StoresRouteModule } from './stores.route.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StoresRouteModule
  ],
  declarations: [StoreComponent]
})
export class StoresModule { }
