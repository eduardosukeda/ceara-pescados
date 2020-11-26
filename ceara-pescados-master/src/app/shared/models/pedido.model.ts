
import { ItemCarrinho } from './item-carrinho.model';
import { Cliente } from './cliente.model';
import { Departamento } from './departamento.modelo';
import { Funcionario } from './funcionario.model';


export class Pedido {
    solicitante: Cliente;
    dataAbertura: any;
    numeroPedido: number;
    ultimaAtualizacao: any;
    carrinho: ItemCarrinho[];
    descricao: string;
    status: string;
    destino: Departamento;
    movimentacoes: Movimentacao[];
    valorPedido: number;
    valorFrete: number;
    tempoEntrega: number;
    tipoPagamento: string;
    statusPagamento: string;
}

export class Movimentacao {
    funcionario: Funcionario;
    dataHora: Date;
    status: string;
    descricao: string;
}
