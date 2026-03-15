import { Component } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonFab, IonFabButton, IonRouterOutlet, ModalController } from '@ionic/angular/standalone';
import { QrModalComponent } from '../qr-modal/qr-modal.component';
import { addIcons } from 'ionicons';
import { homeOutline, walletOutline, cartOutline, personOutline, qrCodeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css',
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonFab, IonFabButton, IonRouterOutlet],
})
export class TabsComponent {
  constructor(private modalCtrl: ModalController) {
    addIcons({ homeOutline, walletOutline, cartOutline, personOutline, qrCodeOutline });
  }

  async openQr() {
    const modal = await this.modalCtrl.create({
      component: QrModalComponent,
      breakpoints: [0, 0.85],
      initialBreakpoint: 0.85,
      handle: true,
      cssClass: 'qr-modal'
    });
    return await modal.present();
  }
}

