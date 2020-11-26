import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskPeso'
})
export class MaskPesoPipe implements PipeTransform {

  transform(value: any, mask?: string): any {
    if (value) {
      return value + " kg";
    }
  }

}
