import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UsersComponent } from './users.component';
import { UsersService } from './users.service';
import { of } from 'rxjs';
import { UserModel } from '../shared/models/user.model';

let users: UserModel[] = [{
  id: '1',
  name: 'essam',
  phone: '123',
  email: 'e@e.com',
  createdAt: '2/2/2'
}]
let response = {count: 5, items: users}
let usersServiceStub = {
  getUsers (page: number, limit: number) {
    return of(response)
  },
  deleteUser (userId: string) {
    return of(users[0])
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

  it('should fetch the users and set the pageSize and loading in component ngOnInit', () => {
    let spy = spyOn(component, 'fetchUsers')
    component.ngOnInit()
    expect(component.loading).toBeTruthy();
    expect(component.activeLimit).toBe(17);
    expect(spy).toHaveBeenCalledWith(1, 17);
  });

  it('should get the users when fetch is called ', () => {
    let spy = spyOn(usersServiceStub, 'getUsers').and.callThrough();
    const data = users
    component.fetchUsers(1, 10)
    expect(spy).toHaveBeenCalledWith(1, 10);
    usersServiceStub.getUsers(1, 10).subscribe((res)=> {
      expect(res).toEqual(response)
      expect(component.users).toEqual(response.items)
    })
  });

  it('should delete the user and refetch the data when  delete is called ', () => {
    let spy = spyOn(usersServiceStub, 'deleteUser').and.callThrough();
    let fetchSpy = spyOn(component, 'fetchUsers');
    const data = users
    component.deleteUser('1')
    expect(spy).toHaveBeenCalledWith('1');
    usersServiceStub.deleteUser('1').subscribe((res)=> {
      expect(fetchSpy).toHaveBeenCalledWith(1, 17)
    })
  });

  it('should fetch the users and set the pageSize and loading in component ngOnInit', () => {
    let spy = spyOn(component, 'fetchUsers')
    component.changePage({pageIndex: 1, pageSize: 23})
    expect(component.activeLimit).toBe(23);
    expect(spy).toHaveBeenCalledWith(2, 23);
  });
});
