import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular/lazy';

import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { provideMaplibreWorker } from '@maplibre/ngx-maplibre-gl/config';
import { NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NgxMapLibreGLModule
  ],
  declarations: [HomePage],
  providers: [
    provideMaplibreWorker('maplibre-gl-worker.mjs')
  ]
})
export class HomePageModule {}
