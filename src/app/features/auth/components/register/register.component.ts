import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoGoogle, mailOutline, lockClosedOutline, personOutline } from 'ionicons/icons';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, IonContent, IonIcon],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  registerForm: FormGroup = this.fb.group({
    displayName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  isLoading = signal(false);
  errorMessage = signal('');

  constructor() {
    addIcons({ logoGoogle, mailOutline, lockClosedOutline, personOutline });
  }

  async onSubmit() {
    if (this.registerForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    const { email, password, displayName } = this.registerForm.value;

    try {
      await this.authService.registerWithEmail(email, password, displayName);
    } catch (error: unknown) {
      const errorCode = (error as { code?: string }).code || '';
      this.errorMessage.set(this.getErrorMessage(errorCode));
    } finally {
      this.isLoading.set(false);
    }
  }

  async loginWithGoogle() {
    this.isLoading.set(true);
    this.errorMessage.set('');

    try {
      await this.authService.loginWithGoogle();
    } catch (error: unknown) {
      const errorCode = (error as { code?: string }).code || '';
      this.errorMessage.set(this.getErrorMessage(errorCode) || 'Error al registrarse con Google.');
    } finally {
      this.isLoading.set(false);
    }
  }

  private getErrorMessage(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Este correo ya está registrado.';
      case 'auth/invalid-email':
        return 'El formato del correo es inválido.';
      case 'auth/weak-password':
        return 'La contraseña es demasiado débil.';
      case 'auth/popup-closed-by-user':
        return 'El registro con Google fue cancelado.';
      default:
        return 'Ocurrió un error al registrarse. Inténtalo de nuevo.';
    }
  }
}
