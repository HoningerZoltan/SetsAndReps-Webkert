import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CalorieFormatPipe } from "./calorie-format.pipe";

@Component({
  selector: 'app-exercise-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, CalorieFormatPipe],
  template: `
    <mat-card class="exercise-card">
      <mat-card-header>
        <mat-card-title>{{ exercise.name }}</mat-card-title>
        <mat-card-subtitle>{{ exercise.muscleGroup }}</mat-card-subtitle>
      </mat-card-header>
      <img mat-card-image [src]="'/images/musclegroups/' + exercise.muscleGroup + '.png'" class="exercise-image" alt="Exercise Image" />
      <mat-card-content>
        <p>{{ exercise.description }}</p>
        <p><strong>Calories:</strong> {{ exercise.calories | calorieFormat }}</p>
        <p><strong>Repetitions:</strong> {{ exercise.repetitions }}</p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button color="warn" (click)="onDelete()">Delete</button>
      </mat-card-actions>
    </mat-card>
  `,
 styles: [`
    .exercise-card {
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: auto;
}

.exercise-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  margin: 10px 0;
}

mat-card-title,
mat-card-subtitle {
  display: block;
  text-align: center;
}

mat-card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  text-align: center;
}

mat-card-actions {
  justify-content: center;
}

  `]
})
export class ExerciseCardComponent {
  @Input() exercise: any;
  @Output() delete = new EventEmitter<void>();

  onDelete() {
    this.delete.emit();
  }
}
