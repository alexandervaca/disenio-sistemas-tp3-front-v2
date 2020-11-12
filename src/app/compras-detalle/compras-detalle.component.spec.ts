import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasDetalleComponent } from './compras-detalle.component';

describe('ComprasDetalleComponent', () => {
  let component: ComprasDetalleComponent;
  let fixture: ComponentFixture<ComprasDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprasDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprasDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
