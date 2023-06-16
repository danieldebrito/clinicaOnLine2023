import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoCardComponent } from './turno-card.component';

describe('TurnoCardComponent', () => {
  let component: TurnoCardComponent;
  let fixture: ComponentFixture<TurnoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnoCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
