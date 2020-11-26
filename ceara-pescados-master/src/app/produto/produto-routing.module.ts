import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../template/home/home.component';
import { InfoProdutoComponent } from './info-produto/info-produto.component';


const routes: Routes = [
  {path: 'produto-info/:id', component: InfoProdutoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoRoutingModule { }
