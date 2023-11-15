import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradasValoresComponent } from './entradas-valores.component';

describe('EntradasValoresComponent', () => {
  let component: EntradasValoresComponent;
  let fixture: ComponentFixture<EntradasValoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntradasValoresComponent]
    });
    fixture = TestBed.createComponent(EntradasValoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
