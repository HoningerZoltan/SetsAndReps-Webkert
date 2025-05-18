import { Component, OnInit } from '@angular/core';
import { WaterService } from '../../shared/services/water.service';
import { AuthService } from '../../shared/services/auth.service';
import { Observable } from 'rxjs';
import { Water } from '../../models/water.model';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-water',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardContent,
    MatProgressBarModule,
    MatButtonModule
  ],
  templateUrl: './water.component.html',
  styleUrls: ['./water.component.scss']
})
export class WaterComponent implements OnInit {
  waterAmount$!: Observable<number>;
  totalLimit: number = 2500;
  addedAmount: number = 0;

  constructor(
    private waterService: WaterService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.waterAmount$ = this.waterService.waterTotal$;
    this.waterService.getAllAmountToday(); // indító lekérés
  }

  addWater(amount: number): void {
    this.addedAmount += amount;
  }

  getPercentage(total: number): number {
    return Math.round(((total) / this.totalLimit) * 100);
  }

  saveWaterIntake(): void {
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.waterAmount$.subscribe(currentAmount => {
          const intake: Water = {
            userId: user.uid,
            date: new Date(),
            amountMl: this.addedAmount,
            // dateString: '2025-05-18' // optional if needed
          };

          this.waterService.saveIntake(intake).then(() => {
            this.addedAmount = 0;
          });
        }).unsubscribe();
      }
    });
  }
}
