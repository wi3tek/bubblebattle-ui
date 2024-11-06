import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spaceForThousands',
})
export class PointReplacerPipe implements PipeTransform {
  transform(value: number): string {
    let valueString: string = value.toString();
    let reverse = '';
    for (let i = valueString.length - 1; i >= 0; i--) {
      reverse += valueString[i];
    }
    return valueString.replace(/(?!^)(?=(?:\d{3})+$)/g, ' ');
  }
}
