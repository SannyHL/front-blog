import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudPostagemComponent } from './crud-postagem.component';

describe('CrudPostagemComponent', () => {
  let component: CrudPostagemComponent;
  let fixture: ComponentFixture<CrudPostagemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudPostagemComponent]
    });
    fixture = TestBed.createComponent(CrudPostagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
