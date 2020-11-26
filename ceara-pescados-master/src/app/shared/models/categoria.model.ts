
export class Categoria {
    id: number;
    nome: string;
    
    dataCriacao: Date;
    dataAlteracao: Date;

    constructor(nome: string) {
        this.nome = nome;
    }
}
