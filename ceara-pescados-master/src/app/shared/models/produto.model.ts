import { Categoria } from './categoria.model';
import { Imagem } from './imagem.model';


export class Produto {
    id: number;
    nome: string;
    descricao: string;
    peso?: number;
    preco?: number;
    promocao: boolean;
    maisVendidos: boolean;
    quantidadeMinimaVenda?: number;
    quantidadeEstoque: number;
    categoria: Categoria;
    imagens: Imagem[];

    dataCriacao: Date;
    dataAlteracao: Date;
}
