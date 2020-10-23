import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SenddataService } from '../senddata.service';
import { TokenStorageService } from '../token-storage.service';


@Component({
  selector: 'app-schedulemeeting',
  templateUrl: './schedulemeeting.component.html',
  styleUrls: ['./schedulemeeting.component.css']
})
export class SchedulemeetingComponent implements OnInit {


  //   peermail='';
  //   duration='';
  //   meeting='';




  //   ngOnInit(): void {

  //   }

  //   model: NgbDateStruct;
  //   // date: {year: number, month: number};


  //   time = {hour: 13, minute: 30};
  //   meridian = true;


  //   constructor(private  activatedRoute : ActivatedRoute,private router:Router,private senddataService:SenddataService) {
  //   }
  //   userForm = new FormGroup({
  //     peermail: new FormControl( "", [Validators.required, Validators.email]),
  //      model: new FormControl("",[Validators.required]),  
  //      time: new FormControl("",[Validators.required]),  
  //      meeting: new FormControl("1",[Validators.required]),  
  //      duration: new FormControl("0",[Validators.required]),    
  //   });

  //     get userFormControl() {
  //       return this.userForm.controls;
  //     } 
  //   toggleMeridian() {
  //     this.meridian = !this.meridian;
  // }
  // onSubmit(emp){
  //   var mail=localStorage.getItem('mail');

  //         
  //         this.senddataService.scheduleMeeting(emp,mail)
  //     .subscribe( 
  //       data => {
  //         console.log(data.id)
  //   },
  //   error => {
  //     console.log(error);
  //   },
  //   ) 

  // }


  topic = '';
  video = '';
  peermail = '';
  duration = '';
  meeting = '';
  exampleCheck1 = '';
  exampleCheck2 = '';
  exampleCheck3 = '';
  exampleCheck4 = '';
  model: NgbDateStruct;
  // date: {year: number, month: number};

  time = { hour: 13, minute: 30 };
  meridian = true;

  ngOnInit(): void {
    if (null == this.token.getToken()) {
      alert("Not Authorized Page. Please login first");
      this.router.navigate(['/signin']);
    }
  }

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private senddataService: SenddataService, private token: TokenStorageService) {
  }
  userForm = new FormGroup({
    peermail: new FormControl("", [Validators.required]),
    model: new FormControl("", [Validators.required]),
    time: new FormControl("", [Validators.required]),
    meeting: new FormControl("1", [Validators.required]),
    video: new FormControl("2", [Validators.required]),
    topic: new FormControl("", [Validators.required]),
  });

  get userFormControl() {
    return this.userForm.controls;
  }

  toggleMeridian() {
    this.meridian = !this.meridian;

  }

  onSubmit(emp) {
    var mail = localStorage.getItem('loginMail');
    console.log("emp is " + emp.topic)
    this.senddataService.scheduleMeeting(emp, mail)
      .subscribe(
        data => {
          console.log(data.id)
          alert("Successfully scheduled meeting");
          this.router.navigate(["/welcome"]);
        },
        error => {
          console.log(error);
        },
      )
  }

}

