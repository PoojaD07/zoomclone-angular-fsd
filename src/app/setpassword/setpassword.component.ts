import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SenddataService } from '../senddata.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-setpassword',
  templateUrl: './setpassword.component.html',
  styleUrls: ['./setpassword.component.css']
})
export class SetpasswordComponent implements OnInit {
  mail = '';
  fname = localStorage.getItem('fname');
  lname = localStorage.getItem('fname');
  password: '';
  cnfpassword: '';
  otp: '';


  constructor(private router: Router, private activatedRoute: ActivatedRoute, private senddataService: SenddataService,private token: TokenStorageService) { }

  userForm = new FormGroup({
    fname: new FormControl(localStorage.getItem('fname')),
    mail: new FormControl(localStorage.getItem('loginMail')),
    lname: new FormControl(localStorage.getItem('lname')),
    otp: new FormControl('', [Validators.required]),
    password: new FormControl("", Validators.compose([Validators.required, this.senddataService.patternValidator()])),
    cnfpassword: new FormControl('', [Validators.required]),
  });


  ngOnInit(): void {
    this.mail = localStorage.getItem('loginMail');
    this.fname = localStorage.getItem('fname');
    this.lname = localStorage.getItem('lname');
  }

  get userFormControl() {
    return this.userForm.controls;
  }


  setPassword() {
    if (this.password != this.cnfpassword) {
      alert('Password and confirm password is mismatched...Try again');
    }
    else if (this.otp != localStorage.getItem('otp')) {
      alert('OTP is wrong');

    }
    else {

      this.senddataService.createUser(this.userForm.getRawValue())
        .subscribe(
          data => {
            console.log("data is " + data.id)
            if ('' != data.id) {
              alert("Data Updated Successfully. Please sign in again")
              this.router.navigate(["/signin"]);
            }
            else {
              alert("password is updated ")
            }
          },
          error => {
            console.log(error);
          },
        )
    }
  }

  onResend() {

    this.senddataService.sendOTP(this.userForm.getRawValue())
      .subscribe(
        data => {
          localStorage.setItem('otp', data.otp)
          alert("uotp sent to " + this.mail)
        },
        error => {
          console.log(error);
        })

  }

}
