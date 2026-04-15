import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComp } from './admin';

describe('Admin', () => {
  let component: AdminComp;
  let fixture: ComponentFixture<AdminComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminComp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
