import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyBGQwBXar9deS2CCicS_nXLrNIyvRaegg4",
      authDomain: "tren-44bd7.firebaseapp.com",
      databaseURL: "https://tren-44bd7-default-rtdb.firebaseio.com",
      projectId: "tren-44bd7",
      storageBucket: "tren-44bd7.firebasestorage.app",
      messagingSenderId: "425964148285",
      appId: "1:425964148285:web:afb6b0ba8174f0bcfe7c54",
      measurementId: "G-NNH551Q287"
    })),
    provideDatabase(() => getDatabase())
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
