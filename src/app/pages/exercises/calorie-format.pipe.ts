import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calorieFormat',
  standalone: true
})
export class CalorieFormatPipe implements PipeTransform {
  transform(value: number | string, unit: string = 'kcal'): string {
    return `${value} ${unit}`;
  }
}