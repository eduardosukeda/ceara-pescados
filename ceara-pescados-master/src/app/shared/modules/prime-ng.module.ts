import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {InputMaskModule} from 'primeng/inputmask';
import {DropdownModule} from 'primeng/dropdown';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {CheckboxModule} from 'primeng/checkbox';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {FileUploadModule} from 'primeng/fileupload';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {SidebarModule} from 'primeng/sidebar';
import {MenuModule} from 'primeng/menu';
import {OrderListModule} from 'primeng/orderlist';
import {CardModule} from 'primeng/card';
import {TooltipModule} from 'primeng/tooltip';
import {CarouselModule} from 'primeng/carousel';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {GalleriaModule} from 'primeng/galleria';
import {DialogModule} from 'primeng/dialog';
import {AccordionModule} from 'primeng/accordion';
import {InputSwitchModule} from 'primeng/inputswitch';
import {StepsModule} from 'primeng/steps';
import {MenuItem} from 'primeng/api';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    InputMaskModule,
    CheckboxModule,
    DropdownModule,
    ScrollPanelModule,
    FileUploadModule,
    DynamicDialogModule,
    SidebarModule,
    OrderListModule,
    CardModule,
    TooltipModule,
    CarouselModule,
    ProgressSpinnerModule,
    GalleriaModule,
    DialogModule,
    AccordionModule,
    InputSwitchModule,
    StepsModule,
    MenuModule,
    MenuModule
  ],
  exports: [
    ButtonModule,
    InputMaskModule,
    CheckboxModule,
    DropdownModule,
    ToggleButtonModule,
    ScrollPanelModule,
    FileUploadModule,
    DynamicDialogModule,
    SidebarModule,
    OrderListModule,
    CardModule,
    TooltipModule,
    CarouselModule,
    ProgressSpinnerModule,
    GalleriaModule,
    DialogModule,
    AccordionModule,
    InputSwitchModule,
    StepsModule,
    MenuModule,
    MenuModule
  ]
})
export class PrimeNGModule { }
