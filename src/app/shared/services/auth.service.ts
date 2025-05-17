import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  authState,
  User,
  UserCredential,
  createUserWithEmailAndPassword
} from '@angular/fire/auth';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { User as AppUser } from '../../models/user.model';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: Observable<User | null>;
  isLoggedIn$: Observable<boolean>; // ✅ figyelhető stream

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {
    this.currentUser = authState(this.auth);

    // ⬇️ ebből lesz boolean stream
    this.isLoggedIn$ = this.currentUser.pipe(
      map(user => !!user)
    );
  }

  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password).then(cred => {
      localStorage.setItem('isLoggedIn', 'true');
      return cred;
    });
  }

  signOut(): Promise<void> {
    localStorage.setItem('isLoggedIn', 'false');
    return signOut(this.auth).then(() => {
      this.router.navigateByUrl('/home');
    });
  }
  getUser(): Observable<User | null> {
    return this.currentUser;
  }

  async signUp(email: string, password: string, userData: Partial<AppUser>): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth, 
        email, 
        password
      );
      
      await this.createUserData(userCredential.user.uid, {
        ...userData,
        id: userCredential.user.uid,
        email: email,
        exercises: [],
      });

      return userCredential;
    } catch (error) {
      console.error('Hiba a regisztráció során:', error);
      throw error;
    }
  }

  private async createUserData(userId: string, userData: Partial<AppUser>): Promise<void> {
    const userRef = doc(collection(this.firestore, 'Users'), userId);
    
    return setDoc(userRef, userData);
  }

  
}
