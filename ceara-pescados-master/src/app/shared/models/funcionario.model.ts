import { Departamento } from './departamento.modelo';
import { Endereco } from './endereco.model';
import { Usuario } from './usuario.model';

export class Funcionario {
    id: number;
    usuario: Usuario;
    departamento: Departamento;
    endereco: Endereco;
    funcao: string;
    foto: any;

    dataCriacao: Date;
    dataAlteracao: Date
}