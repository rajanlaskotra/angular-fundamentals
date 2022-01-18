import { Component, Inject, OnInit } from '@angular/core'
import { inject } from '@angular/core/testing'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Toastr, TOASTR_TOKEN } from '../common/toastr.service'
import { AuthService } from './auth.service'

@Component({
  templateUrl:'./profile.component.html',
  styles: [`
    em { float: right; color: #E56; padding-left: 10px; }
    .error input { background-color: #e3c3c5;}
    .error ::-webkit-input-placeholder { color: #999; }
  `]
})
export class ProfileComponent implements OnInit{
  // Reactive-form (model driven)
  profileForm: FormGroup
  private firstName: FormControl
  private lastName: FormControl
  constructor(private auth: AuthService, private router: Router, @Inject(TOASTR_TOKEN) private toastr: Toastr) {

  }

  ngOnInit() {
    this.firstName = new FormControl(this.auth.currentUser.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')])
    this.lastName = new FormControl(this.auth.currentUser.lastName, [Validators.required, Validators.pattern('[a-zA-Z]*')])
    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    })
  }
  
  saveProfile(formValue) {
    if(this.profileForm.valid){
      this.auth.updateUser(formValue.firstName,formValue.lastName).subscribe(() => {
        //this.router.navigate(['events'])
        this.toastr.success("Profile Saved!")
      })
    }
  }

  logout() {
    this.auth.logoutUser().subscribe(() => {
      this.toastr.success('Logout Success!')
      setTimeout(()=>this.router.navigate(['/user/login']), 1000)
    })
  }
  validateFirstName() {
    return this.firstName.touched && this.firstName.invalid
  }

  validateLastName() {
    return this.lastName.touched && this.lastName.invalid
  }
  cancel(){
    this.router.navigate(['events'])
  }
}