import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiataProdutos } from './liata-produtos';

describe('LiataProdutos', () => {
  let component: LiataProdutos;
  let fixture: ComponentFixture<LiataProdutos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiataProdutos],
    }).compileComponents();

    fixture = TestBed.createComponent(LiataProdutos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
