import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UsersComponent } from './users.component';
import { UsersService } from './users.service';
import { of } from 'rxjs';
import { UserModel } from '../shared/models/user.model';

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
describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ UsersComponent ],
      providers: [
        { provide: UsersService, useValue: usersServiceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
