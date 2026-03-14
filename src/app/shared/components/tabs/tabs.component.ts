import { Component } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, walletOutline, cartOutline, personOutline, addOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css',
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonFab, IonFabButton],
})
export class TabsComponent {
  constructor() {
    addIcons({ homeOutline, walletOutline, cartOutline, personOutline, addOutline });
  }
}

