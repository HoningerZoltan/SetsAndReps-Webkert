import { CommonModule } from '@angular/common';
import { Component, model, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';  
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
    ExerciseCardComponent,
    
  ],
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent  implements OnInit{
  
  exerciseForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.exerciseForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      calories: ['', [Validators.required, Validators.min(0)]],
      repetitions: ['', [Validators.required, Validators.min(1)]],
      muscleGroups: [[], Validators.required],
    });
  }


  onSubmit(): void {
    if (this.exerciseForm.valid) {
      const formData: Exercise = {
        name: this.exerciseForm.value.name,
        musclegroup: this.exerciseForm.value.muscleGroup,
        description: this.exerciseForm.value.description,
        calories: this.exerciseForm.value.calories,
        repetitions: this.exerciseForm.value.repetitions
      };
      console.log('Form Submitted:', formData);
    }
  }

  exercises = [
    {
      name: 'Push Up',
      muscleGroup: "chest",
      calories: 100,
      repetitions: 10,
      description: 'A great upper body exercise.',
    },
    {
      name: 'Hammer bicpes',
      muscleGroup: "arm",
      calories: 57,
      repetitions: 12,
      description: 'A great arm exercise.',
    },
    {
      name: 'Deadlift',
      muscleGroup: "back",
      calories: 200,
      repetitions: 10,
      description: 'A full-body strength movement.',
    },
    {
      name: 'Squat',
      muscleGroup: 'leg',
      calories: 150,
      repetitions: 12,
      description: 'A lower body exercise that targets the quadriceps, hamstrings, and glutes.'
    },
    {
      name: 'Plank',
      muscleGroup: 'abs',
      calories: 50,
      repetitions: 1,
      description: 'An isometric exercise that strengthens the core muscles.'
    },
    {
      name: 'Bicep Curl',
      muscleGroup: 'arm',
      calories: 80,
      repetitions: 12,
      description: 'An isolation exercise that targets the biceps.'
    },
    {
      name: 'Shoulder Press',
      muscleGroup: 'shoulder',
      calories: 120,
      repetitions: 10,
      description: 'A compound exercise that targets the deltoid muscles in the shoulders.'
    }
  ];

  deleteExercise(index: number) {
    this.exercises.splice(index, 1);
  }
}
