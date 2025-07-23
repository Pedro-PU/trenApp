import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CircuitoPage } from './circuito.page';

describe('CircuitoPage', () => {
  let component: CircuitoPage;
  let fixture: ComponentFixture<CircuitoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CircuitoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
