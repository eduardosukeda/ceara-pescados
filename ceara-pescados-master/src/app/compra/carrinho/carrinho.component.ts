import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemCarrinho } from 'src/app/shared/models/item-carrinho.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CarrinhoService } from 'src/app/shared/services/carrinho.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss']
})
export class CarrinhoComponent implements OnInit {

  itens: ItemCarrinho[];
  user: string;

  constructor(private carrinhoService: CarrinhoService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.user = this.authService.getUsuarioAutenticado();
    this.getItens();
    this.carrinhoService.getItens().subscribe(itens => {
      this.itens = itens;
    });
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

  maisPeso(item: ItemCarrinho) {
    this.carrinhoService.incrementarQtd(item);
  }

  menosPeso(item: ItemCarrinho) {
    this.carrinhoService.decrementarQtd(item);
  }

  atualizarPreco(item: ItemCarrinho) {
    return this.carrinhoService.getPrecoTotalItem(item); 
  }

  valorTotal() {
    return this.carrinhoService.total();
  }

  finalizarCompra() {
    console.log('Entrou em finalizar compra')
    this.router.navigate(['/pagamento']);
    /*
    this.user.subscribe(dados => {
      console.log(dados)
      if(dados) {
        console.log('Entrou em usuário logado')
        //this.router.navigate(['/'])
        //this.authServ.logout().then(() => this.router.navigate(['/']));
      } else {
        console.log('Entrou em usuário não logado')
        
      })
    }*/
  }

  excluirItem(item: ItemCarrinho) {
    this.carrinhoService.removerItem(item);
  }

  teste() {
    var btnContainer = document.getElementById("myDIV");

    // Get all buttons with class="btn" inside the container
    var btns = btnContainer.getElementsByClassName("btn");

    // Loop through the buttons and add the active class to the current/clicked button
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");

        // If there's no active class
        if (current.length > 0) {
          current[0].className = current[0].className.replace(" active", "");
        }

        // Add the active class to the current/clicked button
        this.className += " active";
      });
    }
  }

}
