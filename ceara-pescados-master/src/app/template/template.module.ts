import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComumModule } from '../shared/modules/comum.module';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PopoverModule } from "ngx-smart-popover";
import { ProdutoModule } from '../produto/produto.module';


@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    FooterComponent
  ],
  imports: [
    ComumModule,
    ReactiveFormsModule,
    ProdutoModule,
    NgbModule,
    PopoverModule,
    SharedModule
  ],
  exports: [
    HeaderComponent,
    HomeComponent,
    FooterComponent
  ]
})
export class TemplateModule { }
