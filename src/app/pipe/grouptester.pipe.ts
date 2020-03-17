import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'grouptester'
})
export class GrouptesterPipe implements PipeTransform {

  transform(value: Array<string>, ...args: unknown[]): unknown {
    let result = '';
    for (const t of value) {
      result = result + t + ';';
    }
    return result;
  }

}
