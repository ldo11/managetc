import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userrole'
})
export class UserrolePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    switch (value) {
      case 1: return 'Tester';
              break;
      case 2: return 'Senior Tester';
              break;
      case 3: return 'Admin';
              break;
    }
  }

}
