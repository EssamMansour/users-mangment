import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserCardComponent } from './new-user-card.component';

describe('NewUserCardComponent', () => {
  let component: NewUserCardComponent;
  let fixture: ComponentFixture<NewUserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUserCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
