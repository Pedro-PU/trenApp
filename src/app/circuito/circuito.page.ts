import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-circuito',
  templateUrl: './circuito.page.html',
  styleUrls: ['./circuito.page.scss'],
  standalone: false,
})
export class CircuitoPage implements OnInit {

  // controla qué imagen se muestra (Esquemático o PCB)
  segment: 'schem' | 'pcb' = 'schem';

  constructor() {}

  ngOnInit() {}

  segmentChanged(ev: CustomEvent) {
    // ion-segment emite el nuevo value en ev.detail.value
    this.segment = (ev.detail as any).value;
  }
}
