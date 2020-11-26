
export class Usuario {
    id: number;
    nome: string;
    email: string;
    telefone?: string;
    login: string
    senha: string;
    role: string;

    dataCriacao: Date;
    dataAlteracao: Date
}