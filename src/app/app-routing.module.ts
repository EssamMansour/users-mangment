import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '',  loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  {path: 'users',  loadChildren: () => import('./users/users.module').then(m => m.UsersModule)},
  {path: 'users/new-user',  loadChildren: () => import('./users/add-user/add-user.module').then(m => m.AddUserModule)},
  {path: 'users/:id',  loadChildren: () => import('./users/user-details/user-details.module').then(m => m.UserDetailsModule)},
  // 404 page to be done
  {path:'**', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
