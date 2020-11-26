import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DadosPessoaisComponent } from './dados-pessoais/dados-pessoais.component';
import { EnderecoComponent } from './endereco/endereco.component';
import { PedidosComponent } from './pedidos/pedidos.component';


const routes: Routes = [
  {path: 'cliente/dados', component: DadosPessoaisComponent},
  {path: 'cliente/endereco', component: EnderecoComponent},
  {path: 'cliente/pedidos', component: PedidosComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
