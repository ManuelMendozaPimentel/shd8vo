import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionprendasPage } from './gestionprendas.page';

describe('GestionprendasPage', () => {
  let component: GestionprendasPage;
  let fixture: ComponentFixture<GestionprendasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionprendasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
