// src/app/shared/services/water.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Water } from '../../models/water.model';

@Injectable({
  providedIn: 'root'
})
export class WaterService {
  private waterIntakes: Water[] = [];

  private waterSubject = new BehaviorSubject<Water[]>([]);

  constructor() {}

  saveIntake(intake: Water): void {
    this.waterIntakes.push(intake);
    this.waterSubject.next([...this.waterIntakes]);
    console.log('[WaterService] Saved:', intake);
  }

  getIntakes(): Observable<Water[]> {
    return this.waterSubject.asObservable();
  }

  getTotalToday(userId: string): number {
    const today = new Date().toDateString();
    return this.waterIntakes
      .filter(w => w.userId === userId && new Date(w.date).toDateString() === today)
      .reduce((sum, item) => sum + item.amountMl, 0);
  }
}
