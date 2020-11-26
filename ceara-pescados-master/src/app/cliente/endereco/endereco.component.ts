import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { Endereco } from 'src/app/shared/models/endereco.model';
import { EstadoBr } from 'src/app/shared/models/estado-br.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CepService } from 'src/app/shared/services/cep.service';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { EnderecoService } from 'src/app/shared/services/endereco.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss']
})
export class EnderecoComponent implements OnInit {

  form: FormGroup;
  estados: Observable<EstadoBr[]>;
  edit: boolean;
  clienteLogado: Cliente;
  enderecoEntrega: Endereco;

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
          this.enderecoEntrega = this.clienteLogado.endereco;
          this.form.patchValue(this.enderecoEntrega);
          this.edit = true;
        }
    })    
  }

  configForm() {
    this.form = this.fb.group({
      cep: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required),
      cidade: new FormControl('', Validators.required),
      bairro: new FormControl('', Validators.required),
      rua: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      complemento: new FormControl(''),
      telefoneEndereco: new FormControl('', Validators.required),
      pontoReferencia: new FormControl('', Validators.required)      
    })
  }

  get cep() {
    return this.form.get('cep');
  }

  get estado() {
    return this.form.get('estado');
  }

  get cidade() {
    return this.form.get('cidade');
  }

  get bairro() {
    return this.form.get('bairro');
  }

  get rua() {
    return this.form.get('rua');
  }

  get numero() {
    return this.form.get('numero');
  }

  get complemento() {
    return this.form.get('complemento');
  }

  get telefoneEndereco() {
    return this.form.get('telefoneEndereco');
  }

  get pontoReferencia() {
    return this.form.get('pontoReferencia');
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
    this.enderecoService.createOrUpdate(this.form.value).then(() => {
      Swal.fire(`Endereço de entrega ${!this.edit ? 'salvo' : 'atualizado'} com sucesso.`, '', 'success').then((result) => {
        if (result.value) {
          // this.form.reset();
          console.log('0 - this.form.value:');
          console.log(this.form.value);
          this.enderecoEntrega = this.form.value;

          console.log('1 - this.clienteLogado.enderecoEntrega:');
          console.log(this.clienteLogado.enderecoEntrega);
          this.clienteLogado.enderecoEntrega = this.enderecoEntrega;

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


}
