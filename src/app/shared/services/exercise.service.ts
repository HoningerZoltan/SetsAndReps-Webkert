import { Injectable } from '@angular/core';
import { Firestore, collection, doc, addDoc, updateDoc, deleteDoc, getDocs, query, orderBy, getDoc, where } from '@angular/fire/firestore';
import { Observable, from, switchMap, map, of, take, firstValueFrom } from 'rxjs';
import { Exercise } from '../../models/exercise.model';
import { AuthService } from './auth.service';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private readonly EXERCISE = 'Exercises';
  private readonly USERS_COLLECTION = 'Users';

  constructor(
    private authService: AuthService,
    private firestore: Firestore      
  ) { }

  // CREATE
  async addExercise(exercise: Omit<Exercise, 'id'>): Promise<Exercise> {
    const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
    if (!user) throw new Error('No authenticated user found');

    const collectionRef = collection(this.firestore, this.EXERCISE);
    const docRef = await addDoc(collectionRef, exercise);
    await updateDoc(docRef, { id: docRef.id });

    const newExercise = { ...exercise, id: docRef.id } as Exercise;

    const userDocRef = doc(this.firestore, this.USERS_COLLECTION, user.uid);
    const userSnap = await getDoc(userDocRef);
    if (userSnap.exists()) {
      const userData = userSnap.data() as User;
      const exercises = userData.exercises || [];
      exercises.push(docRef.id);
      await updateDoc(userDocRef, { exercises });
    }

    return newExercise;
  }

  getAllExercises(): Observable<Exercise[]> {
    return this.authService.currentUser.pipe(
      switchMap(async user => {
        if (!user) return of([]);
        const userDocRef = doc(this.firestore, this.USERS_COLLECTION, user.uid);
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) return of([]);
        const userData = userDoc.data() as User;
        const exerciseIds = userData.exercises || [];
        if (exerciseIds.length === 0) return of([]);

        const exerciseCollection = collection(this.firestore, this.EXERCISE);
        const exercises: Exercise[] = [];

        const batchSize = 10;
        for (let i = 0; i < exerciseIds.length; i += batchSize) {
          const batch = exerciseIds.slice(i, i + batchSize);
          const q = query(exerciseCollection, where('__name__', 'in', batch));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach(doc => {
            exercises.push({ ...doc.data(), id: doc.id } as Exercise);
          });
        }

        return of(exercises);
      }),
      switchMap(data => data)
    );
  }

  async deleteExercise(exerciseId: string): Promise<void> {
    const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
    if (!user) throw new Error('No authenticated user found');

    const userDocRef = doc(this.firestore, this.USERS_COLLECTION, user.uid);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) throw new Error('User not found');

    const userData = userDoc.data() as User;
    const updated = (userData.exercises || []).filter(id => id !== exerciseId);
    await updateDoc(userDocRef, { exercises: updated });

    const exRef = doc(this.firestore, this.EXERCISE, exerciseId);
    await deleteDoc(exRef);
  }
}
