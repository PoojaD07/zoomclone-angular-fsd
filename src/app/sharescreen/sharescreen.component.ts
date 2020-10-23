import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../token-storage.service';


@Component({
  selector: 'app-sharescreen',
  templateUrl: './sharescreen.component.html',
  styleUrls: ['./sharescreen.component.css']
})
export class SharescreenComponent implements OnInit {


  linkname: '';



  constructor(private router: Router, private activatedRoute: ActivatedRoute,private token: TokenStorageService) { }

  userForm = new FormGroup({


    linkname: new FormControl('', [Validators.required])
  });


  ngOnInit(): void {
    if (null == this.token.getToken()) {
      alert("Not Authorized Page. Please login first");
      this.router.navigate(['/signin']);
    }
  }
  get userFormControl() {
    return this.userForm.controls;
  }
  loginUser() {
    console.log('inside loginuser');

  }



}

