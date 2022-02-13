import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../models/user.model';
import { MyTel } from '../tel-input/tel-input.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Input() user: UserModel
  @Input() edit: boolean
  @Output() submitEvent = new EventEmitter<UserModel>()
  form: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    const phone = this.user?.phone ? this.user.phone.split('-') : []
    this.form = this.fb.group({
      name: [ this.user?.name || '', Validators.compose([Validators.required])],
      email: [  this.user?.email || '', Validators.compose([Validators.required, Validators.email])],
      phone: new MyTel(phone[0] || '', phone[1] || '', phone[2] || ''),
      avatar: [ this.user?.avatar || '', Validators.compose([Validators.required])],
      createdAt: [  this.user?.createdAt ? new Date(this.user?.createdAt): new Date() , Validators.compose([Validators.required])],
  })
  }

  get name() { return this.form.get('name'); }
  get createdAt() { return this.form.get('createdAt'); }
  get avatar() { return this.form.get('avatar'); }
  get phone() { return this.form.get('phone'); }
  get email() { return this.form.get('email'); }


  getErrorMessage(input: AbstractControl | null) {
    if (input?.hasError('required')) {
      return 'You must enter a value';
    }
    return input?.hasError('email') ? 'Not a valid email' : '';
  }

  submit() {
    if(this.form.invalid) return
    // #TODO handle avatar 
    const mobileComb = Object.values(this.phone?.value).join('-').toString()
    const newUser: UserModel = {
      name: this.name?.value,
      phone: mobileComb,
      email: this.email?.value,
      avatar: this.avatar?.value,
      createdAt:  this.createdAt?.value
    }
    this.submitEvent.emit(newUser)
    
  }
}
