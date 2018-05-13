import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'sortedlistdepartment',
})
export class SortedlistdepartmentPipe implements PipeTransform {
  transform(arrangedListData: any, ...args) {
    let data = [];

    Object.keys(arrangedListData).forEach((key) => {
      
    });

    return data;
  }
}
