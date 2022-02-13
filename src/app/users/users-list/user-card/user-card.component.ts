import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UserModel } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() user: UserModel | null = null
  @Output() deleteEvent = new EventEmitter<string>()

  isImgLoaded: boolean = false
  
  constructor() { }

  ngOnInit(): void {
  }

  deleteUser() {
    this.deleteEvent.emit(this.user!.id)
  }
}
