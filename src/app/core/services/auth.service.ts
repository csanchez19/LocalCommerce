import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from './firebase';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: string;
  points: number;
  createdAt: unknown;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  
  currentUser = signal<UserProfile | null>(null);
  isLoading = signal<boolean>(true);

  constructor() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await this.loadUserProfile(user);
      } else {
        this.currentUser.set(null);
        this.isLoading.set(false);
      }
    });
  }

  private async loadUserProfile(user: FirebaseUser) {
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        this.currentUser.set(userDoc.data() as UserProfile);
      } else {
        // Fallback if doc doesn't exist yet
        this.currentUser.set({
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || '',
          role: 'user',
          points: 0,
          createdAt: new Date()
        });
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  private async saveUserToFirestore(user: FirebaseUser, additionalData?: { displayName?: string }) {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      const { email, displayName, uid } = user;
      const createdAt = serverTimestamp();
      
      try {
        await setDoc(userRef, {
          uid,
          email,
          displayName: displayName || additionalData?.displayName || '',
          role: 'user',
          points: 0,
          createdAt
        });
      } catch (error) {
        console.error('Error saving user to Firestore:', error);
      }
    }
  }

  async updateUserProfile(displayName: string) {
    const user = auth.currentUser;
    if (!user) throw new Error('No user logged in');

    try {
      // Update Firebase Auth profile
      await updateProfile(user, { displayName });

      // Update Firestore document
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { displayName });

      // Update local signal state
      this.currentUser.update(current => {
        if (current) {
          return { ...current, displayName };
        }
        return current;
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  async loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await this.saveUserToFirestore(result.user);
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  }

  async registerWithEmail(email: string, password: string, displayName: string) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName });
      await this.saveUserToFirestore(result.user, { displayName });
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Email registration error:', error);
      throw error;
    }
  }

  async loginWithEmail(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Email login error:', error);
      throw error;
    }
  }

  async resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  }

  async logout() {
    try {
      await signOut(auth);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}
