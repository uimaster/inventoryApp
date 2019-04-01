import { NgModule } from '@angular/core';
import { FiltersComponent } from './filter.component';
import { PrimeNGModule } from '../../../app.primeNg.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [ FiltersComponent],
  imports : [ PrimeNGModule, ReactiveFormsModule, FormsModule, CommonModule],
  providers: [],
  exports: [FiltersComponent]
})

export class FiltersModule {}
