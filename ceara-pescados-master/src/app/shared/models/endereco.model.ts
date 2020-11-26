
export class Endereco{
    id: number;
    rua: string;
    numero: number;
    cep: string;
    cidade: string;
    estado: string;
    bairro: string;
    complemento?: string;
    pontoReferencia?: string;
    telefoneEndereco?: string;
    observacao?: string;
    nomeRecebedor?: string;

    dataCriacao: Date;
    dataAlteracao: Date
}