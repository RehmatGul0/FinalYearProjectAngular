import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGetDomainComponent } from './add-get-domain.component';

describe('AddGetDomainComponent', () => {
  let component: AddGetDomainComponent;
  let fixture: ComponentFixture<AddGetDomainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGetDomainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGetDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
