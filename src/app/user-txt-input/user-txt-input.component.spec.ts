import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTxtInputComponent } from './user-txt-input.component';

describe('UserTxtInputComponent', () => {
  let component: UserTxtInputComponent;
  let fixture: ComponentFixture<UserTxtInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTxtInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTxtInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
