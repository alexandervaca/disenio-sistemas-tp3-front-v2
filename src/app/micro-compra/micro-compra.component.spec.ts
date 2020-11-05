import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroCompraComponent } from './micro-compra.component';

describe('MicroCompraComponent', () => {
  let component: MicroCompraComponent;
  let fixture: ComponentFixture<MicroCompraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicroCompraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
