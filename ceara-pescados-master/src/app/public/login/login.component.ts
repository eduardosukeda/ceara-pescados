import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  nome: string;
  email: string;
  telefone: string;
  login: string;
  senha: string;

  loginErro: boolean;
  cadastrando: boolean
 
  constructor(private router: Router,
              private authService: AuthService) { }
 
  ngOnInit() {
  }
 
  onSubmit() {
    this.authService.tentarLogar(this.login, this.senha).subscribe( token => {
      const access_token = JSON.stringify(token);
      sessionStorage.setItem('access_token', access_token);
      this.router.navigate(['/home']);
    }, errorResponse => {
      // this.erros = ['Usuários e/ou senha incorreto(s).'];
      console.log('erro: ', errorResponse);
    })    
  }

  preparaCadastrar(event) {
    event.preventDefault();
    this.cadastrando = true;
  }

  cadastrarCliente() {
    let usuario = new Usuario();
    usuario.nome = this.nome;
    usuario.email = this.email;
    usuario.login = this.login;
    usuario.senha = this.senha;
    usuario.role = 'CLIENT';
    usuario.telefone = this.telefone;

    this.authService.salvar(usuario).subscribe( resp => {
      Swal.fire(`Usuário cadastrado com sucesso.`, '', 'success').then( (result) => {
        this.cadastrando = false;
      });
    }, erroResp => {
      Swal.fire(`Erro ao cadastrar usuário.`, '', 'error');
      console.log('erro de cadastro: ', erroResp);
    });
  }

  cancelaCadastro() {
    this.cadastrando = false;
  }
 
  reloadPage() {
    window.location.reload();
  }

}
