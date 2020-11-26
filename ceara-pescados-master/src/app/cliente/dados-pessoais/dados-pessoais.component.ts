import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { Endereco } from 'src/app/shared/models/endereco.model';
import { EstadoBr } from 'src/app/shared/models/estado-br.model';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import Swal from 'sweetalert2';
import { CepService } from 'src/app/shared/services/cep.service';
import { Validacoes } from 'src/app/shared/utils/validacoes';
import { EnderecoService } from 'src/app/shared/services/endereco.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.scss']
})
export class DadosPessoaisComponent implements OnInit {

  form: FormGroup;
  estados: Observable<EstadoBr[]>;
  edit: boolean;
  clienteLogado: Cliente;
  endEntrega: Endereco = null;

  constructor(private fb: FormBuilder,
              private dropdownService: DropdownService,
              private cepService: CepService,
              private enderecoService: EnderecoService,
              private clienteService: ClienteService,
              private authService: AuthService) { }

  ngOnInit() {
    this.configForm();
    this.estados = this.dropdownService.getEstadosBr();
    const idUsuario = this.authService.getIdUsuarioAutenticado();
    this.clienteService.buscarPorIdUsuario(idUsuario).subscribe(cliente => {
      this.clienteLogado = cliente;
      this.form.patchValue(this.clienteLogado);
        if (this.clienteLogado.endereco) {
          this.endEntrega = this.clienteLogado.endereco;
        }
    })
  }

  configForm() {
    this.form = this.fb.group({
      id: new FormControl(),
      nome: new FormControl('', Validators.required),
      sobrenome: new FormControl('', Validators.required),
      cpf: new FormControl('', [Validators.required,Validacoes.ValidaCpf]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl(''),
      senha: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      confirmarSenha: new FormControl('', Validators.required),
      pessoaFisica: new FormControl(''),
      endereco: new FormGroup({
        cep: new FormControl('', Validators.required),
        estado: new FormControl('', Validators.required),
        cidade: new FormControl('', Validators.required),
        bairro: new FormControl('', Validators.required),
        rua: new FormControl('', Validators.required),
        numero: new FormControl('', Validators.required),
        complemento: new FormControl(''),
        telefoneEndereco: new FormControl('', Validators.required),
        pontoReferencia: new FormControl('', Validators.required)
      }),
      mesmoEnderecoEntrega: new FormControl(),
      enderecoEntrega: new FormControl(''),
      ultimoAcesso: new FormControl('')
    },
    {validator: Validacoes.SenhasCombinam})
  }

  get nome() {
    return this.form.get('nome');
  }

  get sobrenome() {
    return this.form.get('sobrenome');
  }

  get cpf() {
    return this.form.get('cpf');
  }

  get email() {
    return this.form.get('email');
  }

  get telefone() {
    return this.form.get('telefone');
  }

  get senha() {
    return this.form.get('senha');
  }

  get confirmarSenha() {
    return this.form.get('confirmarSenha');
  }

  get pessoaFisica() {
    return this.form.get('pessoaFisica');
  }

  get cep() {
    return this.form.get('endereco.cep');
  }

  get estado() {
    return this.form.get('endereco.estado');
  }

  get cidade() {
    return this.form.get('endereco.cidade');
  }

  get bairro() {
    return this.form.get('endereco.bairro');
  }

  get rua() {
    return this.form.get('endereco.rua');
  }

  get numero() {
    return this.form.get('endereco.numero');
  }

  get complemento() {
    return this.form.get('endereco.complemento');
  }

  get telefoneEndereco() {
    return this.form.get('endereco.telefoneEndereco');
  }

  get pontoReferencia() {
    return this.form.get('endereco.pontoReferencia');
  }

  get enderecoEntrega() {
    return this.form.get('enderecoEntrega');
  }

  get mesmoEnderecoEntrega() {
    return this.form.get('mesmoEnderecoEntrega');
  }

  consultaCep() {
    console.log('Entrou no consultacep do ts')
    let cep = this.form.get('cep').value;
    console.log('cep1')
    console.log(cep)
    if (cep != null && cep !== '') {
      console.log(cep)
      this.cepService.consultaCep(cep).subscribe(dados => {
        console.log('dados');
        console.log(dados);
        this.populaDadosForm(dados)
      });
    }
  }

  populaDadosForm(dados) {
    this.form.patchValue({
      rua: dados.logradouro,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
    })    
  }

  save() {
    /*
    this.enderecoService. createOrUpdate(this.form.value).then(() => {
      Swal.fire(`Endereço de entrega ${!this.edit ? 'salvo' : 'atualizado'} com sucesso.`, '', 'success').then((result) => {
        if (result.value) {
          // this.form.reset();
          console.log('0 - this.form.value:');
          console.log(this.form.value);
          // this.enderecoEntrega = this.form.value;

          console.log('1 - this.clienteLogado.enderecoEntrega:');
          console.log(this.clienteLogado.enderecoEntrega);
          // this.clienteLogado.enderecoEntrega = this.enderecoEntrega;

          console.log('2 - this.enderecoEntrega:');
          console.log(this.enderecoEntrega);
          this.clienteService.createOrUpdate(this.clienteLogado).then(() => {
            this.edit = true;
          })
        }
      })
    })
    */
  }

  alteraSenha() {

  }

}
