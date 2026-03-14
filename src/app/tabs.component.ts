import { Component } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, walletOutline, cartOutline, personOutline, addOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  template: `
    <ion-tabs>
      <ion-tab-bar slot="bottom" class="bg-white border-t border-slate-100 px-2 py-1 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] relative">
        <ion-tab-button tab="home" class="text-slate-400">
          <ion-icon name="home-outline"></ion-icon>
          <ion-label class="text-[10px] font-bold mt-1">INICIO</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="wallet" class="text-slate-400">
          <ion-icon name="wallet-outline"></ion-icon>
          <ion-label class="text-[10px] font-bold mt-1">CARTERA</ion-label>
        </ion-tab-button>

        <!-- Placeholder for the floating button space -->
        <ion-tab-button disabled="true" class="opacity-0">
          <ion-icon name="home-outline"></ion-icon>
        </ion-tab-button>

        <ion-tab-button tab="purchases" class="text-slate-400">
          <ion-icon name="cart-outline"></ion-icon>
          <ion-label class="text-[10px] font-bold mt-1">TIENDA</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="profile" class="text-slate-400">
          <ion-icon name="person-outline"></ion-icon>
          <ion-label class="text-[10px] font-bold mt-1">PERFIL</ion-label>
        </ion-tab-button>
      </ion-tab-bar>

      <ion-fab vertical="bottom" horizontal="center" slot="fixed" class="mb-4">
        <ion-fab-button class="custom-fab">
          <ion-icon name="add-outline" class="text-white text-3xl"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-tabs>
  `,
  styles: [`
    ion-tab-bar {
      --background: white;
      --border: none;
    }
    ion-tab-button {
      --color: #94a3b8;
      --color-selected: #0df2cc;
    }
    ion-tab-button.tab-selected ion-icon {
      color: #0df2cc;
    }
    ion-tab-button.tab-selected ion-label {
      color: #0df2cc;
      font-weight: bold;
    }
    .custom-fab {
      --background: #0df2cc;
      --background-activated: #0bcda8;
      --background-hover: #0bcda8;
      --border-radius: 50%;
      --box-shadow: 0 10px 15px -3px rgba(13, 242, 204, 0.3);
      border: 4px solid white;
      border-radius: 50%;
      width: 64px;
      height: 64px;
      transform: translateY(-10px);
    }
  `],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonFab, IonFabButton],
})
export class TabsComponent {
  constructor() {
    addIcons({ homeOutline, walletOutline, cartOutline, personOutline, addOutline });
  }
}

