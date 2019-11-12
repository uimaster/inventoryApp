import { UsersService } from './../users/service/user.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeNGModule } from '../app.primeNg.module';
import { CommonService } from './services/common.services';

@NgModule({
  imports: [ CommonModule, RouterModule, PrimeNGModule ],
  declarations: [ NavbarComponent],
  exports: [ NavbarComponent, PrimeNGModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  providers: [ UsersService, CommonService]
})

export class SharedModule {}
