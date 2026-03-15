import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon, IonChip } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { notificationsOutline, searchOutline, locationOutline, star, heartOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon, IonChip, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  categories = signal([
    { name: 'Bakery', icon: '🥐', active: true },
    { name: 'Crafts', icon: '🎨', active: false },
    { name: 'Gourmet', icon: '🍷', active: false },
    { name: 'Fashion', icon: '👗', active: false },
  ]);

  businesses = signal([
    {
      id: 1,
      name: 'La Boulangerie Artesanal',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
      rating: 4.9,
      address: 'Calle Real, 42',
      distance: 0.8
    },
    {
      id: 2,
      name: 'Urban Threads Boutique',
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=800',
      rating: 4.7,
      address: 'Av. Libertad, 15',
      distance: 1.2
    },
    {
      id: 3,
      name: 'Manos Creativas',
      image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&q=80&w=800',
      rating: 5.0,
      address: 'Plaza Mayor, Local 3',
      distance: 2.5
    }
  ]);

  constructor() {
    addIcons({ notificationsOutline, searchOutline, locationOutline, star, heartOutline });
  }

  selectCategory(selectedCat: any) {
    this.categories.update(cats => cats.map(cat => ({
      ...cat,
      active: cat.name === selectedCat.name
    })));
  }
}
