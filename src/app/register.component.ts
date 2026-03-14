import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoGoogle, mailOutline, lockClosedOutline, personOutline } from 'ionicons/icons';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, IonContent, IonIcon],
  template: `
    <ion-content class="bg-slate-50">
      <div class="min-h-screen flex flex-col justify-center items-center px-6 py-12 bg-slate-50">
        <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-slate-800 mb-2">Crear Cuenta</h1>
            <p class="text-slate-500 text-sm">Únete para empezar a ganar puntos</p>
          </div>

          @if (errorMessage()) {
            <div class="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 text-center">
              {{ errorMessage() }}
            </div>
          }

          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-5">
            <div>
              <label for="displayName" class="block text-sm font-medium text-slate-700 mb-1">Nombre Completo</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ion-icon name="person-outline" class="text-slate-400 text-lg"></ion-icon>
                </div>
                <input 
                  id="displayName"
                  type="text" 
                  formControlName="displayName"
                  class="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-slate-50 text-slate-900 transition-colors"
                  placeholder="Juan Pérez"
                />
              </div>
            </div>

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
              <label for="password" class="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
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
              <p class="mt-1 text-xs text-slate-500">Mínimo 6 caracteres</p>
            </div>

            <button 
              type="submit" 
              [disabled]="registerForm.invalid || isLoading()"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-slate-900 bg-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {{ isLoading() ? 'Registrando...' : 'Registrarse' }}
            </button>
          </form>

          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-slate-200"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-slate-500">O regístrate con</span>
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
            ¿Ya tienes una cuenta? 
            <a routerLink="/login" class="font-bold text-primary hover:text-brand-dark transition-colors">Inicia sesión</a>
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
