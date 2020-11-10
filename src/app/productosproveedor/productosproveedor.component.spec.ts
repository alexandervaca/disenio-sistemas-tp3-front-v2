import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosproveedorComponent } from './productosproveedor.component';

describe('ProductosproveedorComponent', () => {
  let component: ProductosproveedorComponent;
  let fixture: ComponentFixture<ProductosproveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductosproveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosproveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
