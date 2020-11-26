import { AbstractControl } from '@angular/forms';

export class Validacoes {

    static ValidaCpf(controle: AbstractControl) {
        const cpf = controle.value;
    
        let soma: number = 0;
        let resto: number;
        let valido: boolean;
    
        const regex = new RegExp('[0-9]{11}');
    
        if (
          cpf == '00000000000' ||
          cpf == '11111111111' ||
          cpf == '22222222222' ||
          cpf == '33333333333' ||
          cpf == '44444444444' ||
          cpf == '55555555555' ||
          cpf == '66666666666' ||
          cpf == '77777777777' ||
          cpf == '88888888888' ||
          cpf == '99999999999' ||
          !regex.test(cpf) ||
          cpf.length !== 11
        )
        return { cpfInvalido: true };
        else {
            let numbers, digits, sum, i, result, equalDigits;
            equalDigits = 1;

            for (i = 0; i < cpf.length - 1; i++) {
                if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
                  equalDigits = 0;
                  break;
                }
            }

            if (!equalDigits) {
                numbers = cpf.substring(0, 9);
                digits = cpf.substring(9);
                sum = 0;
                for (i = 10; i > 1; i--) {
                  sum += numbers.charAt(10 - i) * i;
                }
     
                result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
     
                if (result !== Number(digits.charAt(0))) {
                  return { cpfInvalido: true };
                }
                numbers = cpf.substring(0, 10);
                sum = 0;

                for (i = 11; i > 1; i--) {
                    sum += numbers.charAt(11 - i) * i;
                }
                result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    
                if (result !== Number(digits.charAt(1))) {
                    return { cpfInvalido: true };
                }
                return null;
            } else {
                return { cpfInvalido: true };
            }
        }
        return null;
    }
  
    static MaiorQue18Anos(controle: AbstractControl) {
      const nascimento = controle.value;
      const [ano, mes, dia] = nascimento.split('-');
      const hoje = new Date();
      const dataNascimento = new Date(ano, mes, dia, 0, 0, 0);
      const tempoParaTeste = 1000 * 60 * 60 * 24 * 365 * 18; //18 anos em mili segundos...
  
      if (hoje.getTime() - dataNascimento.getTime() >= tempoParaTeste)
        return null;
  
      return { menorDeIdade: true };
    }
  
    static SenhasCombinam(controle: AbstractControl) {
      let senha = controle.get('senha').value;
      let confirmarSenha = controle.get('confirmarSenha').value;
  
      if (senha === confirmarSenha) return null;
  
      controle.get('confirmarSenha').setErrors({ senhasNaoCoincidem: true });
    }

    static SenhasCombinamJur(controle: AbstractControl) {
      let senha = controle.get('senhaJur').value;
      let confirmarSenha = controle.get('confirmarSenhaJur').value;
  
      if (senha === confirmarSenha) return null;
  
      controle.get('confirmarSenhaJur').setErrors({ senhasNaoCoincidem: true });
    }
}
