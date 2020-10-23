import { Component, OnInit } from '@angular/core';
import { SenddataService} from '../senddata.service'
import {​​ FormGroup, FormControl, Validators }​​ from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-meetinghistory',
  templateUrl: './meetinghistory.component.html',
  styleUrls: ['./meetinghistory.component.css']
})
export class MeetinghistoryComponent implements OnInit {
  public peermail: any[] = [];
  constructor(private senddataService:SenddataService ,public dialogRef: MatDialogRef<MeetinghistoryComponent>, ) { }
  mail=localStorage.getItem('loginMail')

  ngOnInit(): void {
    this.fetchHistory()
  }

  fetchHistory()
  {
    this.senddataService.fetchHistory(this.mail).subscribe(data => {
   
    for (let i=0; i<data.length; i++){
      this.peermail.push(data[i]);
      ​​}
    }
  )
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
}
