import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeNGModule } from '../app.primeNg.module';

@NgModule({
  imports: [ CommonModule, RouterModule, PrimeNGModule ],
  declarations: [ NavbarComponent],
  exports: [ NavbarComponent, PrimeNGModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})

export class SharedModule {}
