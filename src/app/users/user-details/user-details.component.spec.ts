import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UserModel } from 'src/app/shared/models/user.model';
import { UsersService } from '../users.service';

import { UserDetailsComponent } from './user-details.component';


let user: UserModel = {
  id: '1',
  name: 'essam',
  phone: '123',
  email: 'e@e.com',
  createdAt: '2/2/2'
}
let usersServiceStub = {
  getUser (userId: string) {
    return of(user)
  },
  deleteUser (userId: string) {
    return of(user)
  },
  editUser (user: UserModel) {
    return of(user)
  }
};
describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDetailsComponent ],
      imports: [ RouterTestingModule],
      providers: [
        { provide: UsersService, useValue: usersServiceStub },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.userID = '1'
    expect(component).toBeTruthy();
  });

  it('should fetch the users and set the pageSize and loading in component ngOnInit', () => {
    let spy = spyOn(component, 'fetchUser')
    component.ngOnInit()
    expect(component.loading).toBeTruthy();
    expect(spy).toHaveBeenCalled();
  });

  it('should get the users when fetch is called ', () => {
    let spy = spyOn(usersServiceStub, 'getUser').and.callThrough();
    const data = user
    component.userID = '1'
    component.fetchUser()
    expect(spy).toHaveBeenCalledWith('1');
    usersServiceStub.getUser('1').subscribe((res)=> {
      expect(res).toEqual(user)
      expect(component.user).toEqual(user)
      expect(component.loading).toBeFalsy()
    })
  });

  it('should navigate to users if no userID ', () => {
    const routerstub: Router = TestBed.get(Router);
    let spy = spyOn(usersServiceStub, 'getUser').and.callThrough();
    spyOn(routerstub, 'navigate');
    component.fetchUser()
    expect(spy).toHaveBeenCalledTimes(0);
    expect(routerstub.navigate).toHaveBeenCalledWith(['users']);
    
  });

  it('should delete the user and navigate to users list when  delete is called ', () => {
    const routerstub: Router = TestBed.get(Router);
    spyOn(routerstub, 'navigate');
    let spy = spyOn(usersServiceStub, 'deleteUser').and.callThrough();
    component.userID = '1'
    component.user = user
    component.deleteUser()
    expect(spy).toHaveBeenCalledWith('1');
    usersServiceStub.deleteUser('1').subscribe((res)=> {
      expect(routerstub.navigate).toHaveBeenCalledWith(['users']);
      expect(component.loading).toBeFalse();
    })
  });

  it('should Edit the user with the new user data ', () => {
    let newUser: UserModel = {
      id: '2',
      name: 'aa',
      phone: '1234',
      email: 'eeee@e.com',
      createdAt: '22/12/2'
    }
    let spy = spyOn(usersServiceStub, 'editUser').and.callThrough();
    component.userID = '2'
    component.user = user
    component.editUser(newUser)
    expect(spy).toHaveBeenCalledWith(newUser);
    usersServiceStub.editUser(newUser).subscribe((res)=> {
      expect(res).toBe(newUser)
      expect(component.user.toString()).toBe(newUser.toString());
      expect(component.loading).toBeFalse();
      expect(component.showEdit).toBeFalse();
    })
  });

});
