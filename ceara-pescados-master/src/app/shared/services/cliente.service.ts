import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario.model';
import { Usuario } from '../models/usuario.model';
import { Cliente } from '../models/cliente.model';

const api = environment.endpoints.cearaPescados + '/api/clientes';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(public http: HttpClient) {}

  buscar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${api}` );
  }

  buscarPorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${api}/${id}` );
  }

  buscarPorIdUsuario(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${api}/${id}/usuario` );
  }

  salvar(cliente: Cliente): Observable<any> {
    return this.http.post<any>(`${api}`, cliente);
  }

  atualizar(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${api}/${cliente.id}`, cliente);
  }

  remover(id: number): Observable<any> {
    return this.http.delete<any>(`${api}/${id}`, httpOptions);
  }



}