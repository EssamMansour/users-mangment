import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/shared/models/user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: UserModel;
  userID: string | null
  isImgLoaded: boolean = false;
  loading:boolean = false
  showEdit: boolean = false
  error: boolean = false
  constructor(private router: Router, private route: ActivatedRoute, private usersService: UsersService) { }

  ngOnInit(): void {
      this.userID = this.route.snapshot.paramMap.get('id')
      this.fetchUser()
  }

  fetchUser() {
    this.loading = true;
    if(!this.userID) {
      this.router.navigate(['users'])
      return
    }
    this.usersService.getUser(this.userID).subscribe({
      next: (res) => {
        this.user = res
        this.loading = false
      },
      error: (err)=> {
        //error handling to be done
        this.router.navigate(['users'])
      }})
  }

  deleteUser() {
    if(!this.user.id) return;
    this.loading = true
    this.usersService.deleteUser(this.user.id).subscribe({
      next: (res)=> {
        if(res) {
          this.router.navigate(['users'])
        }
        this.loading = false

      },
      //handle error 
      error: (err) => {
        this.loading = false
        this.error = true
        console.log(err)
      }
    })
  }

  editUser(user: UserModel) {
    const updatedUser = {
      ...this.user,
      ...user
    }
    this.loading =true
    this.usersService.editUser(updatedUser).subscribe({
      next: (res) => {
        this.user = res
        this.loading = false
        this.showEdit = false;
      },
      //handle error 
      error: (err) => {
        this.loading = false
        this.error = true
        console.log(err)
      }
    })
  }
}
