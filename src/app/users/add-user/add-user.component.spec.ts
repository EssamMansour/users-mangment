import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserComponent } from './add-user.component';
import { UsersService } from '../users.service';
import { of } from 'rxjs';
import { UserModel } from 'src/app/shared/models/user.model';
import { RouterTestingModule } from '@angular/router/testing';

let user: UserModel = {
  id: '1',
  name: '',
  phone: '',
  email: '',
  createdAt: ''
}
let usersServiceStub: Partial<UsersService>= {
  getUsers () {
    return of({count: 5, items: []})
  },
  deleteUser (userID) {
    return of(user)
  }
};

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ AddUserComponent ],
      providers: [
        { provide: UsersService, useValue: usersServiceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
