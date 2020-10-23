import { Component, OnInit } from '@angular/core';
import { SenddataService } from '../senddata.service';
import { ActivatedRoute, Router } from '@angular/router'; 
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { Token } from '@angular/compiler/src/ml_parser/lexer';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {



  
  mail:'';
  fname:'';
  lname:'';



constructor(private router : Router,private  activatedRoute : ActivatedRoute,private senddataService:SenddataService) { }

userForm = new FormGroup({
  mail: new FormControl( "", [Validators.required, Validators.email]),
 fname: new FormControl('', [Validators.required]),
 lname: new FormControl('', [Validators.required])
  });


ngOnInit(): void {
  

}
get userFormControl() {
  return this.userForm.controls;
} 
loginUser(employee){
  localStorage.setItem('loginMail',employee.mail);
  localStorage.setItem('fname',employee.fname);
  localStorage.setItem('lname',employee.lname);
      console.log(employee.mail)
          this.senddataService.sendOTP(employee.mail)
           .subscribe(
     
                    data => {
                              if(''!=data.otp)
                              {
                                localStorage.setItem('otp',data.otp);
    
  
                                this.router.navigate(['/setpassword']);
                              } 
                              else{
                                alert('account is exists')
                              }   
                    },
                    error => {
                      console.log(error);
                    },
     
      );  

  
  
}

// console.log('inside forgotuser');
// var strspl: string[];
// console.log(this.mail);

//     this.senddataService.forgotUser(this.mail)
//     .subscribe(
//       data => {

//         if(null==data)
//         {
//           alert("Entered email does not exist")
//         }
//         else{
//           localStorage.setItem('mail',data.mail);
//          var name=data.name
//          strspl  = name.split(" ");
//          console.log(strspl[0])
//          console.log(strspl[1])

//           localStorage.setItem('fname',strspl[0]);
//           localStorage.setItem('lname',strspl[1]);
//           this.router.navigate(['/setpassword']); 
//         }

}
