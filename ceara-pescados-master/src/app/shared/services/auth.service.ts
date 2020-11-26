import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

const api = environment.endpoints.cearaPescados + '/api/usuarios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenUrl: string = environment.endpoints.cearaPescados + environment.endpoints.obterTokenUrl;
  clientId: string = environment.endpoints.clientId;
  clientSecret: string = environment.endpoints.clientSecret;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(public http: HttpClient) { }

  obterToken(){
    const tokenString = sessionStorage.getItem('access_token')
    if(tokenString){
      const token = JSON.parse(tokenString).access_token
      return token;
    }
    return null;
  }

  encerrarSessao(){
    sessionStorage.removeItem('access_token')
  }

  getUsuarioAutenticado(){
    const token = this.obterToken();
    if(token){
      const usuario = this.jwtHelper.decodeToken(token).user_name
      return usuario;
    }
    return null;
  }

  getIdUsuarioAutenticado(){
    const token = this.obterToken();
    if(token){
      const id = this.jwtHelper.decodeToken(token).user_id
      return id;
    }
    return null;
  }

  estaAutenticado() {
    const token = this.obterToken();
    if(token){
      const expired = this.jwtHelper.isTokenExpired(token)
      return !expired;
    }
    return false;
  }

  tentarLogar( login: string, senha: string ) : Observable<any> {
    const params = new HttpParams()
                        .set('username', login)
                        .set('password', senha)
                        .set('grant_type', 'password')

    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    
    return this.http.post( this.tokenUrl, params.toString(), { headers });
  }

  salvar(usuario: Usuario): Observable<any> {
    return this.http.post<any>(api, usuario);
  }
}
