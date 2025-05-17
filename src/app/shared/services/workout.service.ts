import { Injectable } from '@angular/core';
import { Workout } from '../../models/workout.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private workouts: Workout[] = [];
  private workoutsSubject = new BehaviorSubject<Workout[]>([]);

  constructor() {}

  saveWorkout(workout: Workout): void {
    this.workouts.push(workout);
    this.workoutsSubject.next([...this.workouts]);
    console.log('[WorkoutService] Edzés mentve:', workout);
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
