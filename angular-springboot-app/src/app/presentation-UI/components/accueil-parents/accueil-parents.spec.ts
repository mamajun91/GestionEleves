import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilParents } from './accueil-parents';

describe('AccueilParents', () => {
  let component: AccueilParents;
  let fixture: ComponentFixture<AccueilParents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccueilParents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccueilParents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
