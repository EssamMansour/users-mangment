import { Component, OnInit } from '@angular/core';
import { PAGE_SIZES } from '../config/config';
import { UserModel } from '../shared/models/user.model';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: UserModel[] = [];
  length: number
  loading: boolean = false;
  error: boolean = false;
  pageSizes = PAGE_SIZES;
  activeLimit: number
  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.loading = true;
    this.activeLimit = this.pageSizes[1]
    this.fetchUsers(1, this.activeLimit)
  }

  fetchUsers(page: number, limit: number) {
    this.userService.getUsers(page, limit).subscribe({
      next: (res) => {
      this.users = res.items
      this.length = res.count
      this.loading = false
    },
    error: (err)=> {
      this.loading = false
      this.error = true;
    }})
  }
  deleteUser(id: string) {
    this.loading = true
    this.userService.deleteUser(id).subscribe({
      next: (res)=> {
        if(res) {
          this.fetchUsers(1, this.activeLimit);
        }
      },
      //handle error 
      error: (err) => {
        this.loading = false
        console.log(err)
      }
    })
  }

  changePage(page: {pageIndex:number, pageSize:number}) {
    this.activeLimit = page.pageSize;
    this.fetchUsers(page.pageIndex +1, page.pageSize)
  }
}

