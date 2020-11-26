import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Produto } from '../models/produto.model';

const produtosApi = environment.endpoints.cearaPescados + '/api/produtos';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class ProdutoService {

    constructor(public http: HttpClient) {}

    buscar(): Observable<Produto[]> {
        return this.http.get<Produto[]>(`${produtosApi}` );
    }

    buscarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${produtosApi}/${id}` );
    }

    salvar(produto: Produto): Observable<any> {
    return this.http.post<any>(`${produtosApi}`, produto, httpOptions);
    }

    atualizar(id: number, produto: Produto): Observable<any> {
    return this.http.put<any>(`${produtosApi}/${id}`, produto);
    }

    remover(id: number): Observable<any> {
    return this.http.delete<any>(`${produtosApi}/${id}`, httpOptions);
    }

    private formatarTermoBusca(nome: string): string {
        const map = {"â":"a","Â":"A","à":"a","À":"A","á":"a","Á":"A","ã":"a","Ã":"A","ê":"e","Ê":"E","è":"e","È":"E","é":"e","É":"E","î":"i","Î":"I","ì":"i","Ì":"I","í":"i","Í":"I","õ":"o","Õ":"O","ô":"o","Ô":"O","ò":"o","Ò":"O","ó":"o","Ó":"O","ü":"u","Ü":"U","û":"u","Û":"U","ú":"u","Ú":"U","ù":"u","Ù":"U","ç":"c","Ç":"C"};
        const stringSemAcento = nome.replace(/[\W\[\] ]/g,function(a){return map[a]||a}); 
        return stringSemAcento.toLowerCase();
    }

    private removerAcentos(s: string){
        const map = {"â":"a","Â":"A","à":"a","À":"A","á":"a","Á":"A","ã":"a","Ã":"A","ê":"e","Ê":"E","è":"e","È":"E","é":"e","É":"E","î":"i","Î":"I","ì":"i","Ì":"I","í":"i","Í":"I","õ":"o","Õ":"O","ô":"o","Ô":"O","ò":"o","Ò":"O","ó":"o","Ó":"O","ü":"u","Ü":"U","û":"u","Û":"U","ú":"u","Ú":"U","ù":"u","Ù":"U","ç":"c","Ç":"C"};
        return s.replace(/[\W\[\] ]/g,function(a){return map[a]||a}) 
    }
    
    private formarTags(nome: string): string[] {
        return this.removerAcentos(nome.toLowerCase()).split(" ");
    }

}