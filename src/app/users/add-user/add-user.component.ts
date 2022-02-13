import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyTel } from 'src/app/shared/components/tel-input/tel-input.component';
import { UserModel } from 'src/app/shared/models/user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  
  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  handleSubmit(user: UserModel) {
    this.usersService.addUser(user).subscribe({
      next: (res) => {
        if(res) {
          this.router.navigate(['users'])
        }
      }
    })
  }

}
