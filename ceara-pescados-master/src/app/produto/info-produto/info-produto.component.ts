import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemCarrinho } from 'src/app/shared/models/item-carrinho.model';
import { Pedido } from 'src/app/shared/models/pedido.model';
import { Produto } from 'src/app/shared/models/produto.model';
import { CarrinhoService } from 'src/app/shared/services/carrinho.service';
import { ProdutoService } from 'src/app/shared/services/produto.service';

@Component({
  selector: 'app-info-produto',
  templateUrl: './info-produto.component.html',
  styleUrls: ['./info-produto.component.scss']
})
export class InfoProdutoComponent implements OnInit {

  produtos;
  produto: Produto;
  images: any[];
  pedido: Pedido;
  item: ItemCarrinho;
  preco: number;
  qtdMinima: number;
  displayDialogAddCarrinho: boolean;
  carregarCarrinho: boolean = false;

  constructor(private produtoService: ProdutoService,
              private route: ActivatedRoute,
              private carrinhoService: CarrinhoService) { }

  ngOnInit() {
    this.getProduto();
  }

  getProduto() {
    this.produtoService.buscarPorId(this.route.snapshot.params['id']).subscribe(produto => {
      this.produto = produto;

      console.log('this.produto: ', produto);


      this.item = new ItemCarrinho(this.produto, this.produto.peso);
      console.log('item criado:');
      console.log(this.item);
      this.qtdMinima = produto.peso;
      this.atualizarPreco();
      this.images = [];
      console.log('produto: ', produto);
      console.log('produto.imagens: ', produto.imagens);

      if(produto.imagens && produto.imagens.length > 1) {
        console.log('Tem mais de uma imagem');
        produto.imagens.forEach(imagem => {
          this.images.push({source: 'data:image/jpeg;base64,' + imagem.imagem});
          
        });
      } else {
        console.log('Só tem uma imagem');
        this.images.push({source: 'data:image/jpeg;base64,' + produto.imagens[0].imagem});
      }
      //this.images.push({source:this.produto.imagemInfo1, alt:'Imagem 1', title:'Foto 1'});
      //this.images.push({source:this.produto.imagemInfo2, alt:'Imagem 2', title:'Foto 2'});      
    });
  }

  maisPeso(peso: number) {
    this.item.quantidade = parseFloat(this.item.quantidade.toString()) + parseFloat(this.qtdMinima.toString());
    console.log(this.item.quantidade);
    this.atualizarPreco();
  }

  menosPeso(peso: number) {
    if(this.item.quantidade == this.qtdMinima) {
      this.item.quantidade = this.qtdMinima;
      this.atualizarPreco();
    } else {
      this.item.quantidade = this.item.quantidade - this.qtdMinima;
      this.atualizarPreco();
    }
  }

  atualizarPreco() {
    this.preco = this.item.value();
  }

  adicionarItemNoCarrinho() {
    console.log('item:')
    console.log(this.item)
    this.carrinhoService.addItem(this.item);
    
    this.carregarCarrinho = true;
    setTimeout(() => {
      this.carregarCarrinho = false;
    }, 1000);
    //this.displayDialogAddCarrinho = true;
    /*
    Swal.fire({
      icon: 'success',
      title: 'Produto adicionado no carrinho com sucesso!',
      text: `${this.item.produto.nome} - ${this.item.quantidade} kg`,
      footer: 'Clique no carrinho para finalizar a compra',
      confirmButtonColor: 'rgb(180, 69, 0)'
    })
    */
  }

}
