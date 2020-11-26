import { Observable, of } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { ItemCarrinho } from '../models/item-carrinho.model';
import { NotificacaoService } from './notificacao.service';

@Injectable({
    providedIn: 'root'
})
export class CarrinhoService {

    itens: ItemCarrinho[] = [];
    static emitirItemAdicionado = new EventEmitter<ItemCarrinho>();
    notificadorItens = new EventEmitter<ItemCarrinho[]>();

    constructor(private notificacaoService: NotificacaoService) {}

    clear(){
        this.itens = [];
    }

    itensQtd() {
        return this.itens.length;
    }

    getItens(): Observable<ItemCarrinho[]> {
        return of(this.itens);
    }

    getPrecoTotalItem(item:ItemCarrinho) {
        let itemEncontrado = this.itens.find((ItemCarrinho) => ItemCarrinho.produto.id === item.produto.id);
        return itemEncontrado.produto.preco * itemEncontrado.quantidade;
    }

    addItem(item: ItemCarrinho){
        let itemEncontrado = this.itens.find((ItemCarrinho) => ItemCarrinho.produto.id === item.produto.id);
        if(itemEncontrado){
            this.incrementarQtd(itemEncontrado);
        }else{
            this.itens.push(item);
            localStorage.setItem("cart",JSON.stringify(this.itens));
        }
        CarrinhoService.emitirItemAdicionado.emit(item);
        this.notificadorItens.emit(this.itens);

        let msg = ['Você adicionou o item', `${item.produto.nome}`, 'no carrinho!'];
        
        setTimeout(() => {
            this.notificacaoService.notificar(msg);            
          }, 1000);
        console.log('items:')
        console.log(this.itens)
    }

    removerItem(item: ItemCarrinho){
        this.itens.splice(this.itens.indexOf(item), 1);
        localStorage.setItem("cart",JSON.stringify(this.itens));

        this.notificadorItens.emit(this.itens);

        let msg = ['Você removeu o item', `${item.produto.nome}`, 'do carrinho!'];
        setTimeout(() => {
            this.notificacaoService.notificar(msg);            
          }, 1000);
    }

    total(): number{
        if (this.itens) {
            // console.log('Itens no carrinho seervice')
            // console.log(this.itens)
            return this.itens.map(item => this.valorItem(item)).reduce((prev, value) => prev+value, 0);
        }
    }

    valorItem(item: ItemCarrinho) {
        return item.produto.preco * item.quantidade;        
    }

    incrementarQtd(item: ItemCarrinho) {
        item.quantidade = parseFloat(item.quantidade.toString()) + parseFloat(item.produto.peso.toString());
        localStorage.setItem("cart",JSON.stringify(this.itens));
    }

    decrementarQtd(item: ItemCarrinho) {
        item.quantidade = item.quantidade - item.produto.peso;
        if (item.quantidade === 0) {
            this.removerItem(item);
        }
        localStorage.setItem("cart",JSON.stringify(this.itens));
    }

    
}