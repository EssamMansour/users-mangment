import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MyTelInput } from './components/tel-input/tel-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './components/user-form/user-form.component';
import { MatNativeDateModule } from '@angular/material/core';

const matModuls = [
  MatButtonModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatPaginatorModule
]

@NgModule({
  declarations: [
    MyTelInput,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...matModuls,
  ],
  exports: [
    ...matModuls,
    MyTelInput,
    UserFormComponent
  ]
})
export class SharedModule { }
