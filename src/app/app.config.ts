import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "setsreps-c09e8", appId: "1:479740753909:web:a67b12d8a16ef73bec52bc", storageBucket: "setsreps-c09e8.firebasestorage.app", apiKey: "AIzaSyBOPAwhdG6cuQI2ySl0Rmj0MtV8EyXLfmw", authDomain: "setsreps-c09e8.firebaseapp.com", messagingSenderId: "479740753909", measurementId: "G-TD21N61RKJ" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
