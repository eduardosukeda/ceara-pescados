import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private resultadoBusca: any;
    private exibirHeader: boolean;

    constructor() { }
    
    getResultadoBusca() {
        return this.resultadoBusca;
    }

    setResultadoBusca(result: any) {
        this.resultadoBusca = result;
    }

    getExibirHeader() {
        return this.exibirHeader;
    }

    setExibirHeader(exibir: boolean) {
        this.exibirHeader = exibir;
    }



}