import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthName'
})
export class MonthNamePipe implements PipeTransform {

  private readonly months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  transform(monthIndex: number): string {
    return this.months[monthIndex] || '';
  }

}
