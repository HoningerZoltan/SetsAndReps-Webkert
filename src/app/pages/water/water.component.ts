import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Water } from '../../models/water.model';
import { WaterService } from '../../shared/services/water.service';

@Component({
  selector: 'app-water',
  imports: [MatCard, MatCardContent, MatProgressBarModule, MatButtonModule,CommonModule],
  templateUrl: './water.component.html',
  styleUrls: ['./water.component.scss']
})
export class WaterComponent {
  currentWater: number = 0;
  totalLimit: number = 2500;
  constructor(private waterService: WaterService) {}

  addWater(amount: number) {
    this.currentWater += amount;  
  }


  getPercentage(): number {
    return Math.round((this.currentWater / this.totalLimit) * 100);
  }

  saveWaterIntake(): void {
    const intake: Water = {
      userId: 'testUser',
      date: new Date(),
      amountMl: this.currentWater
    };

    this.waterService.saveIntake(intake);
    console.log(`[WaterComponent] Saved ${intake.amountMl} ml`);
    this.currentWater = 0;
  }
}
