import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoGoogle, mailOutline, lockClosedOutline } from 'ionicons/icons';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, IonContent, IonIcon],
  template: `
    <ion-content class="bg-slate-50">
      <div class="min-h-screen flex flex-col justify-center items-center px-6 py-12 bg-slate-50">
        <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-slate-800 mb-2">Bienvenido</h1>
            <p class="text-slate-500 text-sm">Inicia sesión para continuar</p>
          </div>

          @if (errorMessage()) {
            <div class="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 text-center">
              {{ errorMessage() }}
            </div>
          }

          @if (successMessage()) {
            <div class="bg-emerald-50 text-emerald-600 p-3 rounded-lg text-sm mb-6 text-center">
              {{ successMessage() }}
            </div>
          }

          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-5">
            <div>
              <label for="email" class="block text-sm font-medium text-slate-700 mb-1">Correo Electrónico</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ion-icon name="mail-outline" class="text-slate-400 text-lg"></ion-icon>
                </div>
                <input 
                  id="email"
                  type="email" 
                  formControlName="email"
                  class="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-slate-50 text-slate-900 transition-colors"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div>
              <div class="flex justify-between items-center mb-1">
                <label for="password" class="block text-sm font-medium text-slate-700">Contraseña</label>
                <button type="button" (click)="resetPassword()" class="text-xs font-medium text-primary hover:text-brand-dark transition-colors">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ion-icon name="lock-closed-outline" class="text-slate-400 text-lg"></ion-icon>
                </div>
                <input 
                  id="password"
                  type="password" 
                  formControlName="password"
                  class="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-slate-50 text-slate-900 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" 
              [disabled]="loginForm.invalid || isLoading()"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-slate-900 bg-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {{ isLoading() ? 'Iniciando...' : 'Iniciar Sesión' }}
            </button>
          </form>

          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-slate-200"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-slate-500">O continúa con</span>
              </div>
            </div>

            <div class="mt-6">
              <button 
                (click)="loginWithGoogle()"
                type="button" 
                class="w-full flex items-center justify-center px-4 py-3 border border-slate-200 rounded-xl shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                <ion-icon name="logo-google" class="text-xl mr-2 text-red-500"></ion-icon>
                Google
              </button>
            </div>
          </div>

          <p class="mt-8 text-center text-sm text-slate-600">
            ¿No tienes una cuenta? 
            <a routerLink="/register" class="font-bold text-primary hover:text-brand-dark transition-colors">Regístrate</a>
          </p>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    ion-content {
      --background: #f8fafc;
    }
  `]
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
