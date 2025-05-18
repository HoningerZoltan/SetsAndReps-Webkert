import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { ExerciseCardComponent } from './exercises-card.component';
import { Exercise } from '../../models/exercise.model';
import { ExerciseService } from '../../shared/services/exercise.service';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatCardModule,
    ExerciseCardComponent
  ],
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {
  exerciseForm!: FormGroup;
  exercises: Exercise[] = [];
  isLoading = false;

  constructor(private fb: FormBuilder, private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.exerciseForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      calories: ['', [Validators.required, Validators.min(0)]],
      repetitions: ['', [Validators.required, Validators.min(1)]],
      muscleGroup: ['', Validators.required]
    });

    this.loadExercises();
  }

  loadExercises(): void {
    this.isLoading = true;
    this.exerciseService.getAllExercises().subscribe({
      next: (data) => {
        this.exercises = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Hiba a gyakorlatok lekérésekor:', err);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.exerciseForm.valid) {
      const newExercise: Omit<Exercise, 'id'> = {
        name: this.exerciseForm.value.name!,
        muscleGroup: this.exerciseForm.value.muscleGroup!,
        description: this.exerciseForm.value.description!,
        calories: this.exerciseForm.value.calories!,
        repetitions: this.exerciseForm.value.repetitions!
      };

      this.exerciseService.addExercise(newExercise).then(() => {
        this.exerciseForm.reset();
        this.loadExercises();
      }).catch(error => {
        console.error('Hiba a mentés során:', error);
      });
    }
  }

  deleteExercise(exerciseId: string): void {
    this.exerciseService.deleteExercise(exerciseId).then(() => {
      this.loadExercises();
    }).catch(error => {
      console.error('Hiba a törlés során:', error);
    });
  }
}
