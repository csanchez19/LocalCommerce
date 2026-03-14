import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBackOutline, shareSocialOutline, locationOutline, timeOutline, addOutline, chevronForwardOutline, lockClosedOutline } from 'ionicons/icons';
import { Location } from '@angular/common';

@Component({
  selector: 'app-shop-detail',
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon],
  templateUrl: './shop-detail.component.html',
  styleUrl: './shop-detail.component.css'
})
export class ShopDetailComponent {
  rewards = signal([
    {
      id: 1,
      name: 'Café de Bienvenida',
      description: 'Un espresso o americano gratis',
      points: 50,
      image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=200',
      locked: false
    },
    {
      id: 2,
      name: 'Porción de Tarta',
      description: 'Cualquier tarta del mostrador',
      points: 120,
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=200',
      locked: false
    },
    {
      id: 3,
      name: 'Desayuno Completo',
      description: 'Café + Zumo + Tostada',
      points: 250,
      image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=200',
      locked: true
    }
  ]);

  private location = inject(Location);

  constructor() {
    addIcons({ chevronBackOutline, shareSocialOutline, locationOutline, timeOutline, addOutline, chevronForwardOutline, lockClosedOutline });
  }

  goBack() {
    this.location.back();
  }
}
