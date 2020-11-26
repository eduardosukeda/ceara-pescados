import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { ItemCarrinho } from 'src/app/shared/models/item-carrinho.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CarrinhoService } from 'src/app/shared/services/carrinho.service';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss']
})
export class PagamentoComponent implements OnInit {

  passos: MenuItem[];
  activeIndex: number = 2;
  itens: ItemCarrinho[];
  user: string;
  userId: number;
  index: number = 0;
  usuarioLogado: Observable<Cliente>;


  constructor(private router: Router,
              private authService: AuthService, 
              private usuarioService: UsuarioService,
              private clienteService: ClienteService,
              private carrinhoService: CarrinhoService) { }

  ngOnInit() {

    let usuarios: Observable<Cliente[]>;
    this.user = this.authService.getUsuarioAutenticado();
    this.userId = this.authService.getIdUsuarioAutenticado();
    this.usuarioLogado = this.clienteService.buscarPorIdUsuario(this.userId);
    
    //console.log(this.user);
    this.getItens();
    this.carrinhoService.getItens().subscribe(itens => {
      this.itens = itens;
    });

    this.passos = [{
      label: 'Meu carrinho',
      command: (event: any) => {
          this.activeIndex = 0;
          this.router.navigateByUrl('/carrinho');
      }
    },
    {
        label: 'Identificação',
        command: (event: any) => {
            this.activeIndex = 1;
        }
    },
    {
        label: 'Pagamento',
        command: (event: any) => {
            this.activeIndex = 2;
            this.router.navigateByUrl('/pagamento');
        }
    },
    {
        label: 'Obrigado',
        command: (event: any) => {
            this.activeIndex = 3;
            this.router.navigateByUrl('/');
        }
    }];
    
  }

  getItens() {
    
    let cartSession = localStorage.getItem("cart");
    console.log('cartsesion')
    console.log(JSON.parse(cartSession))
    //carrinho não está vazio
    if(cartSession != null){
      this.carrinhoService.itens = JSON.parse(cartSession);
      this.itens = JSON.parse(cartSession);
    }    
  }
  
  valorTotal() {
    return this.carrinhoService.total();
  }

  openTab(index: number) {
    this.index = index;
  }

  onTabOpen(event) {
    this.index = event.index;
}

}
