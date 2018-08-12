import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [ CommonModule, RouterModule ],
  declarations: [ NavbarComponent],
  exports: [ NavbarComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})

export class SharedModule {}
