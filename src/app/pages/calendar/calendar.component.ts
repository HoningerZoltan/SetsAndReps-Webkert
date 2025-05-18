import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MonthNamePipe } from './month-name.pipe';
import { FormBuilder, FormArray, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ExerciseService } from '../../shared/services/exercise.service';
import { WorkoutService } from '../../shared/services/workout.service';
import { Workout } from '../../models/workout.model';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { firstValueFrom, take } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { Exercise } from '../../models/exercise.model';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    MonthNamePipe,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth();
  daysInMonth: number[] = [];
  firstDayIndex: number = 0;
  weekDays: string[] = ['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V'];
  selectedDay: number | null = null;

  workoutDays: string[] = [];
  restDays: string[] = [];

  exerciseForm: FormGroup;
  availableExercises: Exercise[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private exerciseService: ExerciseService,
    private workoutService: WorkoutService
  ) {
    this.exerciseForm = this.fb.group({
      exercises: this.fb.array([], this.validateNonEmptyArray),
      totalTime: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit() {
    this.generateCalendar(this.currentYear, this.currentMonth);
    this.exerciseService.getAllExercises().subscribe(exs => {
      this.availableExercises = exs;
    });
  }

  get exercises(): FormArray {
    return this.exerciseForm.get('exercises') as FormArray;
  }

  validateNonEmptyArray(control: AbstractControl): ValidationErrors | null {
    const value = (control as FormArray).value;
    return value && value.length > 0 ? null : { required: true };
  }

  addExercise(exercise: Exercise) {
  if (!this.exercises.value.includes(exercise.id)) {
    this.exercises.push(this.fb.control(exercise));
    this.exerciseForm.updateValueAndValidity();
  }
}

  removeExercise(exercise: string) {
    const index = this.exercises.value.indexOf(exercise);
    if (index !== -1) {
      this.exercises.removeAt(index);
      this.exerciseForm.updateValueAndValidity();
    }
  }

  async saveWorkout() {
    if (this.exerciseForm.valid && this.selectedDay !== null) {
      const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
      if (!user) throw new Error('No authenticated user found');
      const workout: Workout = {
        username: user.uid,
        date: new Date(this.currentYear, this.currentMonth, this.selectedDay),
        isRestDay: false,
        duration: this.exerciseForm.value.totalTime,
        exercises: this.exercises.value.map((ex: Exercise) => ex.id)
      };

      this.workoutService.saveWorkout(workout);
      this.exerciseForm.reset({ totalTime: null });
      this.exercises.clear();
      this.exerciseForm.markAsPristine();
      this.exerciseForm.markAsUntouched();
      this.exerciseForm.updateValueAndValidity();
      const workoutDate = new Date(this.currentYear, this.currentMonth, this.selectedDay);
      this.workoutDays.push(workoutDate.toISOString().split('T')[0]); // "YYYY-MM-DD"
      this.closeModal();
    }
  }

  openDayModal(day: number): void {
    this.selectedDay = day;
    this.exerciseForm.reset({ totalTime: null });
    this.exercises.clear();
    this.exerciseForm.markAsPristine();
    this.exerciseForm.markAsUntouched();
    this.exerciseForm.updateValueAndValidity();
  }

  closeModal(): void {
    this.selectedDay = null;
    this.exerciseForm.reset({ totalTime: null });
    this.exercises.clear();
    this.exerciseForm.updateValueAndValidity();
  }

 async onRestDayChange() {
  if (this.selectedDay !== null) {
    const date = new Date(this.currentYear, this.currentMonth, this.selectedDay);
    const dateStr = date.toISOString().split('T')[0];

    if (!this.restDays.includes(dateStr)) {
      this.restDays.push(dateStr);

      // Lekérjük a felhasználót
      const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
      if (!user) {
        console.error('Nincs bejelentkezett felhasználó.');
        return;
      }

      const restDayWorkout: Workout = {
        username: user.uid,
        date: date,
        isRestDay: true,
        duration: 0,
        exercises: []
      };

      this.workoutService.saveWorkout(restDayWorkout);

      this.exerciseForm.reset({ totalTime: null });
      this.exercises.clear();
      this.exerciseForm.updateValueAndValidity();
    }
  }
}
  generateCalendar(year: number, month: number) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    this.firstDayIndex = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    this.daysInMonth = Array.from({ length: lastDay.getDate() }, (_, i) => i + 1);
  }

  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  isWorkoutDay(day: number): boolean {
  const dateStr = new Date(this.currentYear, this.currentMonth, day).toISOString().split('T')[0];
  return this.workoutDays.includes(dateStr);
}
  isRestDayColor(day: number): boolean {
  const dateStr = new Date(this.currentYear, this.currentMonth, day).toISOString().split('T')[0];
  return this.restDays.includes(dateStr);
}
}