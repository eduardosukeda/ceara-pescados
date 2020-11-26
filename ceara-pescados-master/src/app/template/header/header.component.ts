import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

import { PopoverContentComponent } from 'ngx-smart-popover';
import { Observable } from 'rxjs';
import { ItemCarrinho } from 'src/app/shared/models/item-carrinho.model';
import { CarrinhoService } from 'src/app/shared/services/carrinho.service';
import { DataService } from 'src/app/shared/services/data.service';
import { ProdutoService } from 'src/app/shared/services/produto.service';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  buscaForm: FormGroup;
  buscaControl: FormControl;
  navbarCollapsed = true;
  totalItens: number;
  itens: ItemCarrinho[];
  mostrarPopover: boolean = false;
  urlAtual;
  nomeCliente: string;
  exibirHeader: boolean = true;
  clienteLogado: boolean = false;
  produtosBusca: Observable<any>;
  itensMenuUsuario: MenuItem[];

  @ViewChild('myPopover', { static: false }) myPopover : PopoverContentComponent;

  constructor(private fb: FormBuilder,
              private carrinhoService: CarrinhoService,
              private authService: AuthService,
              private produtoService: ProdutoService,
              private dataService: DataService,
              private router: Router,
              private location: Location) {

                this.router.events.subscribe((ev) => {
                    if (ev instanceof NavigationEnd) { 
                        if(location.path().includes('login') || location.path().includes('pagamento')){
                          this.exibirHeader = false;
                          console.log('exibirHeader= '+ this.exibirHeader);
                        } else {
                          this.exibirHeader = true;
                        }
                    }
                });

               }

  ngOnInit() {
    this.urlAtual = this.location.path();
    console.log('urlAtual= '+ this.urlAtual);

    this.obterDadosClienteLogado();

    let cartSession = localStorage.getItem("cart");
    //carrinho não está vazio
    
    if(cartSession != null){
      this.carrinhoService.itens = JSON.parse(cartSession);
      this.itens = JSON.parse(cartSession);
    }

    this.carrinhoService.notificadorItens.subscribe(itens => {
      this.itens = itens;
    })

    this.buscaControl = this.fb.control('');
    this.buscaForm = this.fb.group({
      buscaControl: this.buscaControl
    })

    this.buscaControl.valueChanges.pipe(debounceTime(500))
    .subscribe(termo => console.log(termo));

    //CarrinhoService.emitirItemAdicionado.subscribe(item => this.teste(item));

    this.carregarMenuUsuario();
  }

  carregarMenuUsuario() {
    this.itensMenuUsuario = [
      {
        label: 'Minha conta',
        icon: 'pi pi-refresh',
        command: () => {
            this.update('Miha conta');
        }
      },
      {
        label: 'Meus endereços',
        icon: 'pi pi-times',
        command: () => {
            this.update('Meus endereços');
        }
      },
      {
        label: 'Meus pedidos',
        icon: 'pi pi-refresh',
        command: () => {
            this.update('Miha conta');
        }
      },
      {
        label: 'Sair',
        icon: 'pi pi-times',
        command: () => {
            this.update('Meus pedidos');
        }
      }
    ]
  }

  update(texto: string) {
    console.log('texto: ', texto);
}

  search(termo: string) {
    /*
    console.log('Termo: ' + termo);
    this.produtoService.getProdutosPorTermo(termo).subscribe(prods => {
      console.log("Retorno do service getProdutosPorTermo");
      console.log(prods);

      this.dataService.setResultadoBusca(prods);
      this.router.navigateByUrl('/resultado-busca');
      
      //this.router.navigateByUrl('/resultado-busca', {state: {resultadoBusca: prods}});
      

    })
    //console.log(this.produtosBusca);
    */
  }

  obterDadosClienteLogado() {
    this.clienteLogado = this.authService.estaAutenticado();
    if (this.clienteLogado) {
      this.nomeCliente = this.authService.getUsuarioAutenticado();
      console.log('this.nomeCliente: ', this.nomeCliente);
    }
  }

  logout() {
    this.authService.encerrarSessao();
    this.router.navigate(['/']);
  }

  teste(item: ItemCarrinho){
    this.myPopover.show();
  }

  verCarrinho(){
    console.log('Tamanho de itens= '+ this.itens.length);
    if (this.itens.length > 0) {
      console.log('Entrou em router')
      this.router.navigate(['/carrinho']);
      this.myPopover.hide();
    } else {
      console.log('Entrou no else')
      this.myPopover.show();
    }
  }


}
