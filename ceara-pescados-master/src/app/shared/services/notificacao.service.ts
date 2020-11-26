import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class NotificacaoService {
    notificador = new EventEmitter<string[]>();

    notificar(mensagem: string[]) {
        this.notificador.emit(mensagem);
    }
}