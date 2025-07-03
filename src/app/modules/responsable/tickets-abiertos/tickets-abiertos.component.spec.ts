import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsAbiertosComponent } from './tickets-abiertos.component';

describe('TicketsAbiertosComponent', () => {
  let component: TicketsAbiertosComponent;
  let fixture: ComponentFixture<TicketsAbiertosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketsAbiertosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsAbiertosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
