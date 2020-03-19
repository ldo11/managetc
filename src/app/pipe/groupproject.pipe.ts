import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupproject'
})
export class GroupProjectPipe implements PipeTransform {

  transform(value: Array<string>, ...args: unknown[]): string {
    let result = '';
    for (const t of value) {
      result = result + t + ';';
    }
    return result;
  }



}
