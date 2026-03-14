import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { notificationsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent {
  constructor() {
    addIcons({ notificationsOutline });
  }
}
