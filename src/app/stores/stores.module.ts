import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { SharedModule } from './../shared/shared.module';
import { StoresRouteModule } from './stores.route.module';
import { CreateComponent } from './create/create.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StoresRouteModule
  ],
  declarations: [StoreComponent, CreateComponent]
})
export class StoresModule { }
