import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CircuitoPageRoutingModule } from './circuito-routing.module';

import { CircuitoPage } from './circuito.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CircuitoPageRoutingModule
  ],
  declarations: [CircuitoPage]
})
export class CircuitoPageModule {}
