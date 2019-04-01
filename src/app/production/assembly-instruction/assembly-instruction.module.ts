
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {AssemblyInstructionListComponent} from './component/assembly-instruction-list.component';
import {AssemblyInstructionService} from './services/assembly-instruction.service';
import {AssemblyInstructionComponent} from './component/assembly-instruction.component';
import { PrimeNGModule } from '../../app.primeNg.module';
import { DatePipe } from '@angular/common';
//import { FiltersModule } from './filters/filter.Module';
import { FiltersModule } from '../../transFilters/transFilter.Module';

@NgModule({
  declarations: [ AssemblyInstructionListComponent , AssemblyInstructionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrimeNGModule,
    FiltersModule
  ],
  providers: [ AssemblyInstructionService,DatePipe ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class AssemblyInstructionModule {}

