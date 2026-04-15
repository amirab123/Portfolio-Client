import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Accomplissements } from './accomplissements';

describe('Accomplissements', () => {
  let component: Accomplissements;
  let fixture: ComponentFixture<Accomplissements>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Accomplissements]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Accomplissements);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
