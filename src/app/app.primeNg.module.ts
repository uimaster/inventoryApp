import { NgModule } from '@angular/core';

import {SidebarModule} from 'primeng/sidebar';
import {DataTableModule} from 'primeng/datatable';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {PanelMenuModule} from 'primeng/panelmenu';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DialogModule} from 'primeng/dialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {PanelModule} from 'primeng/panel';
import { ProgressSpinnerModule, AutoCompleteModule } from 'primeng/primeng';


@NgModule({
  imports: [
    SidebarModule,
    DataTableModule,
    TableModule,
    DropdownModule,
    CalendarModule,
    InputTextModule,
    CheckboxModule,
    PanelMenuModule,
    RadioButtonModule,
    DialogModule,
    InputTextareaModule,
    PanelModule,
    ProgressSpinnerModule,
    AutoCompleteModule
  ],
  exports: [
    SidebarModule,
    DataTableModule,
    TableModule,
    DropdownModule,
    CalendarModule,
    InputTextModule,
    CheckboxModule,
    PanelMenuModule,
    RadioButtonModule,
    DialogModule,
    InputTextareaModule,
    PanelModule,
    ProgressSpinnerModule,
    AutoCompleteModule
  ]
})

export class PrimeNGModule {}
