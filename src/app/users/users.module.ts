import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { SharedModule } from '../shared/shared.module';
import { UserCardComponent } from './users-list/user-card/user-card.component';
import { NewUserCardComponent } from './users-list/new-user-card/new-user-card.component';


@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent,
    UserCardComponent,
    NewUserCardComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
  ]
})
export class UsersModule { }
