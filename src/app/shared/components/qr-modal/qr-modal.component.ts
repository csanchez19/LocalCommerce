import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonIcon } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-qr-modal',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonIcon],
  templateUrl: './qr-modal.component.html',
  styleUrl: './qr-modal.component.css'
})
export class QrModalComponent {
  constructor(private modalCtrl: ModalController) {
    addIcons({ closeOutline });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
