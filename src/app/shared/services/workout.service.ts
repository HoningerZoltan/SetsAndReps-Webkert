import { Injectable } from '@angular/core';
import { Workout } from '../../models/workout.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private workouts: Workout[] = [];
  private workoutsSubject = new BehaviorSubject<Workout[]>([]);

  constructor(private firestore: Firestore) {}

  saveWorkout(workout: Workout): void {
    const workoutsRef = collection(this.firestore, 'Workouts');
    addDoc(workoutsRef, {
      ...workout,
      date: workout.date.toISOString() // mentés ISO formátumban
    }).then(() => {
      console.log('Workout saved to Firestore');
    }).catch(error => {
      console.error('Error saving workout:', error);
    });
  }
  

  getAllWorkouts(): Observable<Workout[]> {
    return this.workoutsSubject.asObservable();
  }

  getWorkoutsByDate(date: Date): Workout[] {
    const targetDate = date.toDateString();
    return this.workouts.filter(w => new Date(w.date).toDateString() === targetDate);
  }

  getWorkoutsByUser(username: string): Workout[] {
    return this.workouts.filter(w => w.username === username);
  }

  clearWorkouts(): void {
    this.workouts = [];
    this.workoutsSubject.next([]);
  }
}