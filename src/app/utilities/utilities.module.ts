import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilitiesComponent } from './utilities.component';
import { UtilitiesRouteModule } from './utilities.route.module';
import { SharedModule } from './../shared/shared.module';
import { CreateComponent } from './create/create.component';

@NgModule({
  imports: [
    CommonModule,
    UtilitiesRouteModule,
    SharedModule
  ],
  declarations: [ UtilitiesComponent, CreateComponent]
})
export class UtilitiesModule { }
