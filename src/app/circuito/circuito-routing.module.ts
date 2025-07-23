import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CircuitoPage } from './circuito.page';

const routes: Routes = [
  {
    path: '',
    component: CircuitoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CircuitoPageRoutingModule {}
