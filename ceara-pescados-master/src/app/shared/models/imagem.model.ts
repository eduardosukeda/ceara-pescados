import { Produto } from './produto.model';

export class Imagem {
    id: number;
    imagem: any;
    ordem: number;
    produto: Produto;

    dataCriacao: Date;
    dataAlteracao: Date
}