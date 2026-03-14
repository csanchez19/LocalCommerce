import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personCircleOutline, logOutOutline, settingsOutline, starOutline, createOutline, checkmarkOutline, closeOutline } from 'ionicons/icons';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonIcon],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
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
