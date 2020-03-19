import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userstatus'
})
export class UserstatusPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    switch (value) {
      case 1: return 'Active';
              break;
      case 2: return 'Inactive';
              break;
      case 3: return 'Pending';
              break;
    }
  }

}
