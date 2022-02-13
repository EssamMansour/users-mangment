import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserModel } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  @Input() usersList: UserModel[] = [];
  @Output() deleteEvent= new EventEmitter<string>()
  constructor() { }

  ngOnInit(): void {
  }

  deleteUser(id: string) {
    this.deleteEvent.emit(id)
  }
}
