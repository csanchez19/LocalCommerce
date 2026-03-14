import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBackOutline, bagHandleOutline, cafeOutline, shirtOutline, filmOutline, bookOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-purchases',
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon, RouterLink],
  templateUrl: './purchases.component.html',
  styleUrl: './purchases.component.css'
})
export class PurchasesComponent {
  purchases = signal([
    { id: 1, name: 'Supermercado Central', date: 'Hoy, 14:30', amount: 45.20, points: 45, icon: 'bag-handle-outline' },
    { id: 2, name: 'Coffee House', date: 'Ayer, 09:15', amount: 8.50, points: 8, icon: 'cafe-outline' },
    { id: 3, name: 'Moda Urbana', date: '12 Oct, 18:45', amount: 120.00, points: 120, icon: 'shirt-outline' },
    { id: 4, name: 'Cineplex', date: '10 Oct, 21:00', amount: 24.00, points: 24, icon: 'film-outline' },
    { id: 5, name: 'Librería Nova', date: '08 Oct, 11:20', amount: 32.15, points: 32, icon: 'book-outline' },
  ]);

  constructor() {
    addIcons({ chevronBackOutline, bagHandleOutline, cafeOutline, shirtOutline, filmOutline, bookOutline });
  }
}
