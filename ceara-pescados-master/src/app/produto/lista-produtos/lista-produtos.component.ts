import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { ItemCarrinho } from 'src/app/shared/models/item-carrinho.model';
import { Produto } from 'src/app/shared/models/produto.model';
import { CarrinhoService } from 'src/app/shared/services/carrinho.service';
import { ProdutoService } from 'src/app/shared/services/produto.service';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.scss'],
  animations: [
    trigger('mostrar-botao', [
      state('hidden', style({
        opacity: 0,
        top: '0px'
      })),
      state('visible', style({
        opacity: 1,
        top: '20px'
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ])
  ]
})
export class ListaProdutosComponent implements OnInit {

  responsiveOptions;
  valor: number;
  produto: Produto;
  item: ItemCarrinho;
  carregarCarrinho:boolean = false;

  @Input() produtos;
  screenWidth = screen.width;
  screenHeight = screen.height;

  constructor(private carrinhoService: CarrinhoService,
              private produtoService: ProdutoService) {
                this.responsiveOptions = [
                  {
                      breakpoint: '1024px',
                      numVisible: 1,
                      numScroll: 3
                  },
                  {
                      breakpoint: '768px',
                      numVisible: 1,
                      numScroll: 3
                  },
                  {
                      breakpoint: '560px',
                      numVisible: 1,
                      numScroll: 3
                  }
              ];
   }

  ngOnInit() {
    console.log('screenWidth= '+ this.screenWidth)
    console.log('screenHeight= '+ this.screenHeight)

  }

  quebrarTexto(size, value): string {
    if (value && value.length > size) {
        return value.substr(0, size) + "...";
    }
    return value;
  }

  adicionarItemNoCarrinho(produto: Produto) {
    this.produto = produto;
    
    this.item = new ItemCarrinho(this.produto, this.produto.peso);
    console.log('item criado:');
    console.log(this.item);
    
    this.carrinhoService.addItem(this.item);

    this.carregarCarrinho = true;
    setTimeout(() => {
      this.carregarCarrinho = false;
    }, 1000);
    //this.displayDialogAddCarrinho = true;
  }

}
