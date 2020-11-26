import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { ComumModule } from '../shared/modules/comum.module';
import { SharedModule } from '../shared/shared.module';
import { CompraRoutingModule } from './compra-routing.module';
import { PagamentoComponent } from './pagamento/pagamento.component';
import { CheckoutComponent } from './checkout/checkout.component';



@NgModule({
  declarations: [CarrinhoComponent, PagamentoComponent, CheckoutComponent],
  imports: [
    ComumModule,
    SharedModule,
    CompraRoutingModule
  ]
})
export class CompraModule { }
