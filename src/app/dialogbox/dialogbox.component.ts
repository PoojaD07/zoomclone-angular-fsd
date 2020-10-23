import { Component, OnInit } from '@angular/core';
import { SenddataService } from '../senddata.service';

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})
export class DialogboxComponent implements OnInit {

  user = localStorage.getItem('name');
  room = localStorage.getItem('room');
  public origin = 'me';
  public msg: string;
  public msgList: any[] = [];

  constructor(private senddataService: SenddataService) { }

  ngOnInit(): void {
    this.senddataService.serverNewMessage().subscribe(
      (res) => {
        this.msgList.push(res)
      },
      (err) => {
        console.log("server error " + err)
      }
    );
  }

  sendMessage() {
    console.log(this.user)
    this.msgList.push({ user: this.user, msg: this.msg, origin: this.origin })
    console.log(this.origin)
    this.senddataService.sendMessageClient(this.user, this.msg, this.room)
    this.msg = ''
    localStorage.setItem('name', '');
  }
}  
