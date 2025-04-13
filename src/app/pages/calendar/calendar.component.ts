import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MonthNamePipe } from './month-name.pipe';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Workout } from '../../models/workout.model';

@Component({
  selector: 'app-calendar',
  imports: [CommonModule,MonthNamePipe, FormsModule, ReactiveFormsModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth();
  daysInMonth: number[] = [];
  firstDayIndex: number = 0;
  weekDays: string[] = ['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V'];
  selectedDay:number| null=null;
  restDayChecked: boolean = false;
  isRestDay: boolean = false; 
exerciseForm: FormGroup;
  availableExercises: string[] = ['Futás', 'Súlyemelés', 'Úszás', 'Kerékpározás'];
  savedWorkouts: { exercises: string[], totalTime: number }[] = [];

  constructor(private fb: FormBuilder) {

    this.exerciseForm = this.fb.group({
      exercises: this.fb.array([]),
      totalTime: ['', [Validators.required, Validators.min(1)]],
    });
  }

  addExercise(exercise: string) {
    const exercises = this.exerciseForm.get('exercises') as any;
    if (!exercises.value.includes(exercise)) {
      exercises.push(this.fb.control(exercise));
    }
  }

  saveWorkout() {
    if (this.exerciseForm.valid) {
      const formData: Workout = {
        username: "test",
        date: new Date(this.currentYear,this.currentMonth,this.selectedDay!),
        isRestDay:false,
        duration: this.exerciseForm.value.totalTime,
        exercises: this.exerciseForm.value.exercises
      };
      this.exerciseForm.reset();
      console.log(formData);
      alert('Edzés mentve!');
      this.closeModal();
    }
  }

  removeExercise(exercise: string) {
    const exercises = this.exerciseForm.get('exercises') as any;
    const index = exercises.value.indexOf(exercise);
    if (index !== -1) {
      exercises.removeAt(index);
    }
  }



  ngOnInit() {
    this.generateCalendar(this.currentYear, this.currentMonth);
    
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

  openDayModal(day: number) {
    this.selectedDay = day;
    this.isRestDay = false; 
    this.exerciseForm.reset(); 
  }

  closeModal() {
    this.selectedDay = null;
    this.isRestDay = false;
    this.exerciseForm.reset(); 
  }

  onRestDayChange() {
    if (this.isRestDay) {
      this.exerciseForm.reset();
      this.restDays.push(this.selectedDay||0);
    }
  }


  workoutDays: number[] = [1,2,4, 5, 10]; 
  restDays: number[] = [3, 7, 12];    


  isWorkoutDay(day: number): boolean {
    return this.workoutDays.includes(day);
  }

  isRestDayColor(day: number): boolean {
    return this.restDays.includes(day);
  }

}
