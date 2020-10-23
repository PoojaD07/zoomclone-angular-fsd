import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 
import { SenddataService} from '../senddata.service'
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {  
  
    name:'';
    mail:'';
    password:'';
    exampleCheck1=true;
   
  constructor(private  activatedRoute : ActivatedRoute,private router:Router,private senddataService:SenddataService,private tokenStorage: TokenStorageService) { }
 
  userForm = new FormGroup({
    mail: new FormControl( "", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.compose([Validators.required, this.senddataService.patternValidator()])),

    });
  
 
  ngOnInit(): void { 
        this.tokenStorage.signOut();
   }


  get userFormControl() {
    return this.userForm.controls;
  } 

  loginUser(){
     localStorage.setItem('loginMail',this.mail);
          this.senddataService.findAll(this.userForm)
          .subscribe(
            data => {
              this.tokenStorage.saveToken(data.accessToken);
              this.tokenStorage.saveUser(data);
              // this.isLoggedIn = true;
               this.router.navigate(['/welcome']);         
            },
            error => {
                alert('Invalid Credentials');
                 }); 
    
  }
 
  
 
  
}


