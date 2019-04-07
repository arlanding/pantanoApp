import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoonPage } from './soon.page';

describe('SoonPage', () => {
  let component: SoonPage;
  let fixture: ComponentFixture<SoonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoonPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
