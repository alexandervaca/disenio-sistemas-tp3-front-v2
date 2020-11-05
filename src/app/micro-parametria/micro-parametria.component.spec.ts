import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroParametriaComponent } from './micro-parametria.component';

describe('MicroParametriaComponent', () => {
  let component: MicroParametriaComponent;
  let fixture: ComponentFixture<MicroParametriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicroParametriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroParametriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
