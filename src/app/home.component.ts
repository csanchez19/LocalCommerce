import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { notificationsOutline, searchOutline, locationOutline, star, heartOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon, RouterLink],
  template: `
    <ion-content class="bg-slate-50">
      <div class="max-w-md mx-auto min-h-screen pb-20 bg-white shadow-xl relative">
        <header class="p-6 pb-2">
          <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-bold tracking-tight text-slate-800">Explora tu <span class="text-primary">Municipio</span></h1>
            <button class="p-2 bg-slate-100 rounded-custom">
              <ion-icon name="notifications-outline" class="text-xl text-slate-600"></ion-icon>
            </button>
          </div>

          <div class="relative mb-6">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <ion-icon name="search-outline" class="text-slate-400 text-xl"></ion-icon>
            </span>
            <input class="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-custom focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm shadow-sm" placeholder="¿Qué estás buscando hoy?" type="text"/>
          </div>

          <div class="flex space-x-4 overflow-x-auto hide-scrollbar pb-2">
            @for (cat of categories(); track cat.name) {
              <button 
                class="flex-shrink-0 px-5 py-2 font-semibold rounded-custom text-sm transition-colors"
                [ngClass]="cat.active ? 'bg-primary text-slate-900 shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'">
                {{ cat.icon }} {{ cat.name }}
              </button>
            }
          </div>
        </header>

        <section class="p-6 space-y-6">
          @for (business of businesses(); track business.id) {
            <article class="bg-white rounded-custom overflow-hidden shadow-lg border border-slate-100 cursor-pointer" [routerLink]="['/shop', business.id]">
              <div class="relative h-48">
                <img [src]="business.image" [alt]="business.name" class="w-full h-full object-cover"/>
                <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center shadow-sm">
                  <ion-icon name="star" class="text-yellow-500 mr-1 text-xs"></ion-icon>
                  <span class="text-xs font-bold">{{ business.rating }}</span>
                </div>
                <div class="absolute bottom-3 left-3">
                  <span class="bg-primary px-3 py-1 rounded-custom text-[10px] font-bold uppercase tracking-wider text-slate-900 shadow-sm">Loyalty Badge</span>
                </div>
              </div>
              <div class="p-4">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="font-bold text-lg text-slate-800">{{ business.name }}</h3>
                    <p class="text-xs text-slate-500 flex items-center mt-1">
                      <ion-icon name="location-outline" class="mr-1"></ion-icon>
                      {{ business.address }} • {{ business.distance }} km
                    </p>
                  </div>
                  <button class="p-2 rounded-full bg-slate-50 text-slate-400">
                    <ion-icon name="heart-outline" class="text-xl"></ion-icon>
                  </button>
                </div>
              </div>
            </article>
          }
        </section>
      </div>
    </ion-content>
  `,
  styles: [`
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    ion-content {
      --background: #f8fafc;
    }
  `]
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
}
