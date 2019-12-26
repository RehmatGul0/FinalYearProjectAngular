import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGetAlgorithmComponent } from './add-get-algorithm.component';

describe('AddGetAlgorithmComponent', () => {
  let component: AddGetAlgorithmComponent;
  let fixture: ComponentFixture<AddGetAlgorithmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGetAlgorithmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGetAlgorithmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
