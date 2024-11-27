import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewestCarsComponent } from './newest-cars.component';

describe('NewestCarsComponent', () => {
  let component: NewestCarsComponent;
  let fixture: ComponentFixture<NewestCarsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewestCarsComponent]
    });
    fixture = TestBed.createComponent(NewestCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
