import { NgModule } from "@angular/core";

import { SidebarModule } from "primeng/sidebar";
import { DataTableModule } from "primeng/datatable";
import { TableModule } from "primeng/table";
import { DropdownModule } from "primeng/dropdown";
import { CalendarModule } from "primeng/calendar";
import { InputTextModule } from "primeng/inputtext";
import { CheckboxModule } from "primeng/checkbox";
import { PanelMenuModule } from "primeng/panelmenu";
import { RadioButtonModule } from "primeng/radiobutton";
import { DialogModule } from "primeng/dialog";
import { InputTextareaModule } from "primeng/inputtextarea";
import { PanelModule } from "primeng/panel";
import { ProgressSpinnerModule, AutoCompleteModule } from "primeng/primeng";
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { TabViewModule } from "primeng/tabview";
import { InputSwitchModule } from "primeng/inputswitch";
import { FieldsetModule } from "primeng/fieldset";
import {TooltipModule} from 'primeng/tooltip';
import {MultiSelectModule} from 'primeng/multiselect';
import {AccordionModule} from 'primeng/accordion';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';

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
    AutoCompleteModule,
    MessagesModule,
    MessageModule,
    TabViewModule,
    InputSwitchModule,
    FieldsetModule,
    TooltipModule,
    MultiSelectModule,
    AccordionModule,
    OverlayPanelModule,
    ToastModule
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
    AutoCompleteModule,
    MessagesModule,
    MessageModule,
    TabViewModule,
    InputSwitchModule,
    FieldsetModule,
    TooltipModule,
    MultiSelectModule,
    AccordionModule,
    OverlayPanelModule,
    ToastModule
  ],
  providers: [
      MessageService
  ]
})
export class PrimeNGModule {}
