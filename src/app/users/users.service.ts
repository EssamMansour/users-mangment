import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserModel } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  
  constructor(private http: HttpClient ) { }

  getUsers(page: number = 1, limit: number = 17) {
    return this.http.get<{items: UserModel[], count: number}>(`${environment.baseURL}users?page=${page}&limit=${limit}`)
  }

  getUser(userID: string) {
    return this.http.get<UserModel>(`${environment.baseURL}users/${userID}`)
  }

  addUser(userData: UserModel) {
    return this.http.post(`${environment.baseURL}users`, userData)
  }

  editUser(userData: UserModel) {
    return this.http.put<UserModel>(`${environment.baseURL}users/${userData.id}`, userData)
  }

  deleteUser(userID: string) {
    return this.http.delete<UserModel>(`${environment.baseURL}users/${userID}`)
  }
}
