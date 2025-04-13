import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Water } from '../../models/water.model';

@Component({
  selector: 'app-water',
  imports: [MatCard, MatCardContent, MatProgressBarModule, MatButtonModule,CommonModule],
  templateUrl: './water.component.html',
  styleUrls: ['./water.component.scss']
})
export class WaterComponent {
  currentWater: number = 0;
  totalLimit: number = 2500;


  addWater(amount: number) {
    this.currentWater += amount;  
  }


  getPercentage(): number {
    return Math.round((this.currentWater / this.totalLimit) * 100);
  }

  saveWaterIntake() {
     const formData: Water = {
            userId: "testUSer",
            date: new Date(),
            amountMl: this.currentWater
          };
      console.log(formData.amountMl);
  }
}
