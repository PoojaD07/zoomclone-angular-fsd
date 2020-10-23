import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SenddataService } from '../senddata.service'
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-joinmeeting',
  templateUrl: './joinmeeting.component.html',
  styleUrls: ['./joinmeeting.component.css']
})
export class JoinmeetingComponent implements OnInit {

  public msgList: any[] = [];
  fname: '';
  linkname: '';
  show = true;
  exampleCheck1 = false;
  exampleCheck2 = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private senddataService: SenddataService, private token: TokenStorageService) { }

  userForm = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    linkname: new FormControl('', [Validators.required]),
  });


  ngOnInit(): void {

    if (null == this.token.getToken()) {
      alert("Not Authorized Page. Please login first");
      this.router.navigate(['/signin']);
    }
    this.join();
    if (this.linkname != null) {
      this.show = false;
    }
    else {
      this.show = true;
    }
    this.senddataService.serverJoinRoom().subscribe(
      (res) => {
        console.log("server response " + res)
        this.msgList.push(res)
      },
      (err) => {
        console.log("server error " + err)
      })
  }

  get userFormControl() {
    return this.userForm.controls;
  }

  joinMeeting() {
    localStorage.setItem('room', this.linkname);
    localStorage.setItem('name', this.fname);
    this.senddataService.fetchName(localStorage.getItem('room')).subscribe(
      data => {
        if (null == data) {
          alert("Meeting Id does not exist")
          this.router.navigate(['joinmeeting'])
        } else {
          this.senddataService.joinRoom(this.fname, this.linkname)
          this.router.navigate(['/display']);
        }
      }, error => {
        console.log(error);
      })
  }

  join() {
    this.activatedRoute.params.subscribe(params =>
      this.linkname = params.id);
    console.log(this.linkname + ' meeting ID')
  }

}





