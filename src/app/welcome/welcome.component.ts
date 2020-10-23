import { Component, OnInit } from '@angular/core';
import { SenddataService } from '../senddata.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MeetinghistoryComponent } from '../meetinghistory/meetinghistory.component';
import { TokenStorageService } from '../token-storage.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private senddataService: SenddataService, public dialog: MatDialog, private token: TokenStorageService) { }
  mail = ''
  public msgList: any[] = [];
  currentUser: any;

  ngOnInit(): void {
    if (null == this.token.getToken()) {
      alert("Not Authorized Page. Please login first");
      this.router.navigate(['/signin']);
    }
    this.currentUser = this.token.getUser();

    this.mail = localStorage.getItem('loginMail');

    this.fetchData();

    this.senddataService.serverJoinRoom().subscribe(
      (res) => {
        console.log("server response " + res)
        this.msgList.push(res)
      },
      (err) => {
        console.log("server error " + err);

      })
  }

  fetchData() {
    this.senddataService.fetchData(this.mail)
      .subscribe(
        data => {
          localStorage.setItem('room', data[0].meetingId);
          localStorage.setItem('name', data[0].name);
        },
        error => {
          console.log(error);
        });
  }


  joinMeet() {
    this.senddataService.joinRoom(localStorage.getItem('name'), localStorage.getItem('room'))
    this.router.navigate(['/display']);
  }

  openDialog() {
    const dialogRef = this.dialog.open(MeetinghistoryComponent, {
      panelClass: 'my-dialog-history',
    });
  }

  public openConfirmationDialog() {
    this.senddataService.confirm('Are you sure?')
    .then((confirmed) => this.logOut())
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  logOut(){
    this.token.signOut();
    this.router.navigate(['/signin']);
  }
}
