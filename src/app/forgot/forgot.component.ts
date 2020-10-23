import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router'; 
import { SenddataService } from '../senddata.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

 
  mail:'';
 

constructor(private router : Router,private  activatedRoute : ActivatedRoute,private senddataService:SenddataService) { }

userForm = new FormGroup({
  mail: new FormControl( "", [Validators.required, Validators.email]),
 
  });


ngOnInit(): void {
  
 

}
get userFormControl() {
  return this.userForm.controls;
} 
forgotUser(){
  console.log('inside forgotuser');
  var strspl: string[];
  console.log(this.mail);

    this.senddataService.forgotUser(this.mail)
    .subscribe(
      data => {

        if(null==data)
        {
          alert("Entered email does not exist")
        }
        else{
          localStorage.setItem('mail',data.data.mail);
localStorage.setItem('otp',data.otp);
         var name=data.data.name
         strspl  = name.split(" ");
         console.log(strspl[0])
         console.log(strspl[1])

          localStorage.setItem('fname',strspl[0]);
          localStorage.setItem('lname',strspl[1]);
          this.router.navigate(['/setpassword']); 
        }
                
      },
      error => {
          alert('This User is not registered .');
  console.log(error);
});


}
}