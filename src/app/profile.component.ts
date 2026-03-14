import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personCircleOutline, logOutOutline, settingsOutline, starOutline, createOutline, checkmarkOutline, closeOutline } from 'ionicons/icons';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonIcon],
  template: `
    <ion-content class="bg-slate-50">
      <div class="max-w-md mx-auto min-h-screen pb-20 bg-slate-50 relative flex flex-col">
        <header class="pt-8 px-6 pb-6 bg-white border-b border-slate-100">
          <h1 class="text-2xl font-bold text-slate-800">Mi Perfil</h1>
        </header>

        <main class="flex-grow p-6">
          @if (authService.isLoading()) {
            <div class="flex justify-center items-center h-40">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          } @else if (authService.currentUser(); as user) {
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6 flex flex-col items-center text-center relative">
              @if (!isEditing()) {
                <button (click)="startEditing(user.displayName)" class="absolute top-4 right-4 text-slate-400 hover:text-primary transition-colors">
                  <ion-icon name="create-outline" class="text-xl"></ion-icon>
                </button>
              }

              <div class="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                <ion-icon name="person-circle-outline" class="text-xl"></ion-icon>
              </div>

              @if (isEditing()) {
                <div class="w-full mb-4 flex items-center space-x-2">
                  <input 
                    type="text" 
                    [ngModel]="editName()"
                    (ngModelChange)="editName.set($event)"
                    class="flex-grow px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                    placeholder="Tu nombre"
                  />
                  <button (click)="saveProfile()" [disabled]="isSaving()" class="p-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200 transition-colors disabled:opacity-50">
                    @if (isSaving()) {
                      <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-emerald-600"></div>
                    } @else {
                      <ion-icon name="checkmark-outline" class="text-xl"></ion-icon>
                    }
                  </button>
                  <button (click)="cancelEditing()" [disabled]="isSaving()" class="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50">
                    <ion-icon name="close-outline" class="text-xl"></ion-icon>
                  </button>
                </div>
              } @else {
                <h2 class="text-xl font-bold text-slate-800">{{ user.displayName || 'Usuario' }}</h2>
              }
              
              <p class="text-slate-500 text-sm mb-4">{{ user.email }}</p>
              
              <div class="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full font-bold text-sm flex items-center">
                <ion-icon name="star-outline" class="mr-2"></ion-icon>
                {{ user.points }} Puntos Acumulados
              </div>
            </div>

            @if (errorMessage()) {
              <div class="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 text-center">
                {{ errorMessage() }}
              </div>
            }

            <div class="space-y-3">
              <button class="w-full bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between text-slate-700 hover:bg-slate-50 transition-colors">
                <div class="flex items-center">
                  <ion-icon name="settings-outline" class="text-xl mr-3 text-slate-400"></ion-icon>
                  <span class="font-medium">Configuración</span>
                </div>
              </button>

              <button 
                (click)="logout()"
                class="w-full bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between text-red-600 hover:bg-red-50 transition-colors">
                <div class="flex items-center">
                  <ion-icon name="log-out-outline" class="text-xl mr-3 text-red-400"></ion-icon>
                  <span class="font-medium">Cerrar Sesión</span>
                </div>
              </button>
            </div>
          } @else {
            <div class="flex justify-center items-center h-40">
              <p class="text-slate-500">No se pudo cargar el perfil.</p>
            </div>
          }
        </main>
      </div>
    </ion-content>
  `,
  styles: [`
    ion-content {
      --background: #f8fafc;
    }
  `]
})
export class ProfileComponent {
  authService = inject(AuthService);

  isEditing = signal(false);
  isSaving = signal(false);
  editName = signal('');
  errorMessage = signal('');

  constructor() {
    addIcons({ personCircleOutline, logOutOutline, settingsOutline, starOutline, createOutline, checkmarkOutline, closeOutline });
  }

  startEditing(currentName: string) {
    this.editName.set(currentName || '');
    this.isEditing.set(true);
    this.errorMessage.set('');
  }

  cancelEditing() {
    this.isEditing.set(false);
    this.errorMessage.set('');
  }

  async saveProfile() {
    if (!this.editName().trim()) {
      this.errorMessage.set('El nombre no puede estar vacío.');
      return;
    }

    this.isSaving.set(true);
    this.errorMessage.set('');

    try {
      await this.authService.updateUserProfile(this.editName());
      this.isEditing.set(false);
    } catch (error) {
      this.errorMessage.set('Error al actualizar el perfil.');
      console.error(error);
    } finally {
      this.isSaving.set(false);
    }
  }

  async logout() {
    await this.authService.logout();
  }
}
