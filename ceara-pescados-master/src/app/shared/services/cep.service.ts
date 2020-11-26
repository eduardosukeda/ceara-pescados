import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CepService {
    
    constructor(private http: HttpClient) {}

    consultaCep(cep: string) {
        console.log('Entrou no consultaCep com o cep: '+ cep)

        cep = cep.replace(/\D/g, '');
        console.log('Cep depois do replace: '+ cep)

        if(cep !== '') {
            const validacep = /^[0-9]{8}$/;
            console.log('valida: '+ validacep.test(cep))

            if (validacep.test(cep)) {
                return this.http.get(`//viacep.com.br/ws/${cep}/json`);
            }
        }

        return of({});
        
    }
}