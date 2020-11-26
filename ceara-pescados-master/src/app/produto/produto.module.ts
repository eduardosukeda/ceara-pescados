import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComumModule } from '../shared/modules/comum.module';
import { SharedModule } from '../shared/shared.module';
import { InfoProdutoComponent } from './info-produto/info-produto.component';
import { ProdutoRoutingModule } from './produto-routing.module';



@NgModule({
  declarations: [
    ListaProdutosComponent,
    InfoProdutoComponent
  ],
  imports: [
    ComumModule,
    ReactiveFormsModule,
    SharedModule,
    ProdutoRoutingModule
  ],
  exports: [
    ListaProdutosComponent
  ]
})
export class ProdutoModule { }
