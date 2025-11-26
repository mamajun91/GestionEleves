import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassGroupPage } from './class-group-page';

describe('ClassGroupPage', () => {
  let component: ClassGroupPage;
  let fixture: ComponentFixture<ClassGroupPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassGroupPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassGroupPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
