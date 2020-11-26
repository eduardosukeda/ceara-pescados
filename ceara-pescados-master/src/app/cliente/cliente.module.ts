import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DadosPessoaisComponent } from './dados-pessoais/dados-pessoais.component';
import { EnderecoComponent } from './endereco/endereco.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ComumModule } from '../shared/modules/comum.module';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DadosPessoaisComponent,
    EnderecoComponent,
    PedidosComponent
  ],
  imports: [
    ComumModule,
    ReactiveFormsModule,
    SharedModule,
    ClienteRoutingModule
  ],
  exports: [

  ]
})
export class ClienteModule { }
