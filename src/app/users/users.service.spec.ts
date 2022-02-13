import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserModel } from '../shared/models/user.model';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

    });
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return opservable of the users reponse', () => {
    let users: UserModel[] = [{
      id: '1',
      name: 'essam',
      phone: '123',
      email: 'e@e.com',
      createdAt: '2/2/2'
    }]
    const response = {count: 1, items: users}
    httpClientSpy.get.and.returnValue(of(response));

    service.getUsers(5, 10).subscribe((data)=> {
      expect(httpClientSpy.get.calls.count()).toBe(1);
      expect(data).toBe(response)
    })
  });

  it('should return opservable of the selected user', () => {
    let user: UserModel = {
      id: '1',
      name: 'essam',
      phone: '123',
      email: 'e@e.com',
      createdAt: '2/2/2'
    }
    httpClientSpy.get.and.returnValue(of(user));

    service.getUser('5').subscribe((data)=> {
      expect(httpClientSpy.get.calls.count()).toBe(1);
      expect(data).toBe(user)
    })
  });

  it('should fire post request witht the user data', () => {
    let user: UserModel = {
      name: '',
      phone: '',
      email: '',
      createdAt: ''
    }
    service.addUser(user).subscribe((data)=> {
      expect(httpClientSpy.post.calls.count()).toBe(1);
    })
  });

  it('should fire post request witht the user data', () => {
    let user: UserModel = {
      id: '1',
      name: 'essam',
      phone: '123',
      email: 'e@e.com',
      createdAt: '2/2/2'
    }
    service.editUser(user).subscribe((data)=> {
      expect(httpClientSpy.put.calls.count()).toBe(1);
    })
  });
});
