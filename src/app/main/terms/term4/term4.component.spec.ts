import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Term4Component } from './term4.component';

describe('Term4Component', () => {
  let component: Term4Component;
  let fixture: ComponentFixture<Term4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Term4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Term4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
