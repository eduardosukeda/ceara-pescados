import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Endereco } from '../models/endereco.model';


const api = environment.endpoints.cearaPescados + '/api/enderecos';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(public http: HttpClient) {}

  buscar(): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(`${api}` );
  }

  buscarPorId(id: number): Observable<Endereco> {
    return this.http.get<Endereco>(`${api}/${id}` );
  }

  salvar(endereco: Endereco): Observable<any> {
    return this.http.post<any>(`${api}`, endereco, httpOptions);
  }

  atualizar(endereco: Endereco): Observable<any> {
    return this.http.put<any>(`${api}/${endereco.id}`, endereco);
  }

  remover(id: number): Observable<any> {
    return this.http.delete<any>(`${api}/${id}`, httpOptions);
  }


}