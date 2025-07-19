import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Database, ref, onValue } from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit, AfterViewInit {
  velocidadMedia = 0;
  direccion = 'Desconocida';
  velocidadPWM = 0;

  @ViewChild('progressCircle') progressCircle!: ElementRef<SVGCircleElement>;

  constructor(private database: Database) {}

  ngAfterViewInit() {
    this.updateProgress(this.velocidadMedia);
  }

  updateProgress(velocidad: number) {
    if (!this.progressCircle) return;
    const circle = this.progressCircle.nativeElement;
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    const maxVelocidad = 200; // ajustar max según tu caso
    const percent = Math.min(velocidad / maxVelocidad, 1);
    const offset = circumference - percent * circumference;
    circle.style.strokeDashoffset = offset.toString();
  }

  getColorPWM(): string {
    if (this.velocidadPWM > 75) return '#eb445a'; // rojo fuerte
    if (this.velocidadPWM > 40) return '#f4a261'; // naranja
    return '#3880ff'; // azul
  }

  getSizePWM(): number {
    return 40 + (this.velocidadPWM / 100) * 40; // tamaño entre 40 y 80 px
  }

  ngOnInit(): void {
    const refDatos = ref(this.database, 'sensores');
    onValue(refDatos, (snapshot) => {
      const datos = snapshot.val();
      if (datos) {
        this.velocidadMedia = datos.velocidad_media ?? 0;
        this.direccion = datos.sensor_digital === 1 ? 'Adelante' : 'Atrás';
        this.velocidadPWM = datos.velocidad_pwm ?? 0;
        this.updateProgress(this.velocidadMedia);
      }
    });
  }
}
