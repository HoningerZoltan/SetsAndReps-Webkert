// water.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Firestore, collection, addDoc, getDocs, query, where, orderBy, limit } from '@angular/fire/firestore';
import { Water } from '../../models/water.model';
import { AuthService } from './auth.service';
import { formatDate } from '@angular/common';
import { take, firstValueFrom } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Auth,authState } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class WaterService {
  private readonly WATER = 'waterIntake';
  private waterTotalSubject = new BehaviorSubject<number>(0);
  public waterTotal$ = this.waterTotalSubject.asObservable();

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private auth: Auth 
  ) {authState(this.auth).subscribe(user => {
    if (!user) {
      this.waterTotalSubject.next(0);  // ⬅️ nullázzuk az értéket kijelentkezéskor
    }
  });}

  private getTodayString(): string {
    return formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  }

async saveIntake(intake: Water): Promise<void> {
  const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
  if (!user) throw new Error('No authenticated user found');

  const today = this.getTodayString();

  // Lekérdezzük az aznapi eddigi összes mennyiséget
  const colRef = collection(this.firestore, this.WATER);
  const q = query(
  collection(this.firestore, 'waterIntake'),
  where('userId', '==', user.uid),
  where('dateString', '==', '2024-05-18'), // vagy a getTodayString()
  orderBy('amountMl', 'desc'),
  limit(1)
);
  const snapshot = await getDocs(q);
  let currentTotal = 0;
  if (!snapshot.empty) {
    const doc = snapshot.docs[0];
    const data = doc.data() as Water;
    currentTotal = data.amountMl ?? 0;
  }

  const newAmount = intake.amountMl;
  const updatedTotal = currentTotal + newAmount;


  // Új dokumentum mentése
  await addDoc(colRef, {
    userId: user.uid,
    date: new Date(),
    dateString: today,
    amountMl: updatedTotal  // ❗ csak az új mennyiség
  });

  console.log('[WaterService] Added only the new amount:', newAmount);

  // Ezután frissítjük a tárolt max értéket
  await this.updateTotal(); // Ez már lekéri a legnagyobbat újra
}

async updateTotal(): Promise<void> {
  const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
  if (!user) return;

  const today = this.getTodayString();
  const colRef = collection(this.firestore, this.WATER);

  const q = query(
    colRef,
    where('userId', '==', user.uid),
    where('dateString', '==', today)
  );

  const snapshot = await getDocs(q);

  let total = 0;
  snapshot.forEach(doc => {
    const data = doc.data() as Water;
    total += data.amountMl ?? 0;
  });

  this.waterTotalSubject.next(total);
}

  async getAllAmountToday(): Promise<void> {
    await this.updateTotal();
  }
  
}
