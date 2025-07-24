import { Component, OnInit } from '@angular/core';
import { Database, ref, onValue } from '@angular/fire/database';

interface GaugeTick { x1:number; y1:number; x2:number; y2:number; }

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  velocidadMedia = 0;
  direccion = 'Desconocida';
  velocidadPWM = 0;

  // Anim flags
  velFlash = false;
  private velFlashTimeout?: any;
  private lastVelocidadMedia = 0;
  private lastDireccion = 'Desconocida';

  /* Gauge config */
  readonly maxVelocidad = 200;
  readonly startAngle = -90;
  readonly endAngle = 90;

  gaugeAngle = -90;
  gaugeCircumference = 0;
  gaugeDashoffset = 0;
  gaugeTicks: GaugeTick[] = [];

  constructor(private database: Database) {}

  ngOnInit(): void {
    this.initGaugeGeometry();

    const refDatos = ref(this.database, 'sensores');
    onValue(refDatos, (snapshot) => {
      const datos = snapshot.val();
      if (!datos) { return; }

      const nuevaVel = datos.velocidad_media ?? 0;
      const nuevaDir = datos.sensor_digital === 1 ? 'Adelante' : 'Atrás';
      const nuevoPWM = datos.velocidad_pwm ?? 0;

      // detecta cambios para animaciones
      if (Math.abs(nuevaVel - this.lastVelocidadMedia) > 1) {
        this.triggerVelFlash();
      }
      this.lastVelocidadMedia = nuevaVel;

      this.velocidadMedia = nuevaVel;
      this.direccion = nuevaDir;
      this.velocidadPWM = nuevoPWM;

      this.updateGauge(this.velocidadMedia);
    });
  }

  /* ----- Gauge geometry ----- */
  private initGaugeGeometry() {
    const r = 80;
    const sweepRad = Math.PI; // 180°
    this.gaugeCircumference = r * sweepRad;

    const steps = 4;
    this.gaugeTicks = [];
    for (let i = 0; i <= steps; i++) {
      const frac = i / steps;
      const angleDeg = this.startAngle + frac * (this.endAngle - this.startAngle);
      const a = angleDeg * Math.PI / 180;
      const cx = 100, cy = 100;
      const ro = 80, ri = 72;
      this.gaugeTicks.push({
        x1: cx + ro * Math.cos(a),
        y1: cy + ro * Math.sin(a),
        x2: cx + ri * Math.cos(a),
        y2: cy + ri * Math.sin(a),
      });
    }
  }

  private updateGauge(vel: number) {
    const v = Math.max(0, Math.min(this.maxVelocidad, vel));
    const frac = v / this.maxVelocidad;
    this.gaugeAngle = this.startAngle + frac * (this.endAngle - this.startAngle);
    const visible = frac * this.gaugeCircumference;
    this.gaugeDashoffset = this.gaugeCircumference - visible;
  }

  /* Vel flash animation toggle */
  private triggerVelFlash() {
    this.velFlash = false;
    if (this.velFlashTimeout) clearTimeout(this.velFlashTimeout);
    // force frame flush
    requestAnimationFrame(() => {
      this.velFlash = true;
      this.velFlashTimeout = setTimeout(() => (this.velFlash = false), 300);
    });
  }

  /* PWM percent (0-100) */
  get pwmPercent(): number {
    const v = Math.max(0, Math.min(100, this.velocidadPWM));
    return v;
  }

  /* PWM speed class for animation stripes */
  get pwmSpeedClass(): string {
    const v = this.pwmPercent;
    if (v > 75) return 'pwm-fast';
    if (v > 40) return 'pwm-med';
    if (v > 0)  return 'pwm-slow';
    return 'pwm-off';
  }

  /* Color logic reused */
  getColorPWM(): string {
    if (this.velocidadPWM > 75) return '#eb445a';
    if (this.velocidadPWM > 40) return '#f4a261';
    return '#3880ff';
  }
}
