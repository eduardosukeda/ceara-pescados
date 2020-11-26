
import { Departamento } from './departamento.modelo';
import { Endereco } from './endereco.model';
import { Usuario } from './usuario.model';

export class Cliente {
    id: number;
    usuario: Usuario;
    cpf: string;
    endereco: Endereco;

    dataCriacao: Date;
    dataAlteracao: Date
}