import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoGoogle, mailOutline, lockClosedOutline } from 'ionicons/icons';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, IonContent, IonIcon],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  constructor() {
    addIcons({ logoGoogle, mailOutline, lockClosedOutline });
  }

  async onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    const { email, password } = this.loginForm.value;

    try {
      await this.authService.loginWithEmail(email, password);
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
    this.successMessage.set('');

    try {
      await this.authService.loginWithGoogle();
    } catch (error: unknown) {
      const errorCode = (error as { code?: string }).code || '';
      this.errorMessage.set(this.getErrorMessage(errorCode) || 'Error al iniciar sesión con Google.');
    } finally {
      this.isLoading.set(false);
    }
  }

  async resetPassword() {
    const emailControl = this.loginForm.get('email');
    if (!emailControl || emailControl.invalid) {
      this.errorMessage.set('Por favor, ingresa un correo electrónico válido para restablecer tu contraseña.');
      this.successMessage.set('');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    try {
      await this.authService.resetPassword(emailControl.value);
      this.successMessage.set('Se ha enviado un correo para restablecer tu contraseña.');
    } catch (error: unknown) {
      const errorCode = (error as { code?: string }).code || '';
      this.errorMessage.set(this.getErrorMessage(errorCode) || 'Error al enviar el correo de restablecimiento.');
    } finally {
      this.isLoading.set(false);
    }
  }

  private getErrorMessage(code: string): string {
    switch (code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Correo o contraseña incorrectos.';
      case 'auth/invalid-email':
        return 'El formato del correo es inválido.';
      case 'auth/popup-closed-by-user':
        return 'El inicio de sesión con Google fue cancelado.';
      default:
        return 'Ocurrió un error al iniciar sesión. Inténtalo de nuevo.';
    }
  }
}
