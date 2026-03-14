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
  template: `
    <ion-content class="bg-slate-50">
      <div class="max-w-md mx-auto min-h-screen pb-20 bg-slate-50 relative flex flex-col">
        <header class="bg-white sticky top-0 z-10 border-b border-slate-100 px-4 py-6">
          <div class="flex items-center gap-4">
            <button class="p-1 -ml-1 text-slate-600" routerLink="/home">
              <ion-icon name="chevron-back-outline" class="text-2xl"></ion-icon>
            </button>
            <h1 class="text-2xl font-bold tracking-tight text-slate-900">Mis Compras</h1>
          </div>
        </header>

        <main class="flex-grow p-4">
          <div class="space-y-3">
            @for (purchase of purchases(); track purchase.id) {
              <div class="bg-white p-4 rounded-custom shadow-[0_2px_4px_rgba(0,0,0,0.05)] flex items-center justify-between border border-slate-50">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                    <ion-icon [name]="purchase.icon" class="text-xl"></ion-icon>
                  </div>
                  <div class="flex flex-col">
                    <span class="font-semibold text-slate-900 leading-tight">{{ purchase.name }}</span>
                    <span class="text-sm text-slate-500">{{ purchase.date }}</span>
                  </div>
                </div>
                <div class="text-right flex flex-col items-end">
                  <span class="font-bold text-slate-900 leading-tight">\${{ purchase.amount | number:'1.2-2' }}</span>
                  <span class="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">+{{ purchase.points }} pts</span>
                </div>
              </div>
            }
          </div>
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
