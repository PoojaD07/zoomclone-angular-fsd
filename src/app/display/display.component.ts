import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogboxComponent } from 'src/app/dialogbox/dialogbox.component';
import { Component, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import * as Peer from 'peerjs';
import { SenddataService } from '../senddata.service'
import { HeaderComponent } from '../header/header.component';
import { TokenStorageService } from '../token-storage.service';
export declare var RTCMultiConnection: any;

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DisplayComponent implements OnInit {
  flag=1;
  name = localStorage.getItem('name') ;
  room = localStorage.getItem('room');
  peer: Peer;
  connection;
  myStream: MediaStream;
  myEl: HTMLMediaElement;
  video: HTMLVideoElement;
  mute: boolean = true;
  toggle1: boolean = false; 
  toggle2: boolean = false; 
  constructor(public dialog: MatDialog, private renderer: Renderer2, private router: Router, private senddataService: SenddataService, private token: TokenStorageService) { }
  tokenkey = '';

  @ViewChild('parent', { static: false }) parent;

  ngOnInit() {
    if (null == this.token.getToken()) {
      alert("Not Authorized Page. Please login first");
      this.router.navigate(['/signin']);
    }

    this.room = localStorage.getItem('room')
    this.senddataService.fetchName(this.room).subscribe(
      data => {
        if (null == data) {
          alert("Meeting Id does not exist")
          this.router.navigate(['joinmeeting'])
        } else {
          this.name = data.name;
        }
      }, error => {
        console.log(error);
      })

    this.connection = new RTCMultiConnection();

    this.connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

    this.connection.session = {
      audio: true,
      video: true
    };

  this.connection.sdpConstraints.mandatory = {
      OfferToReceiveAudio: true,
      OfferToReceiveVideo: true
    }

    var videoContainer = document.getElementById('video-Container');
    this.connection.onstream = function (event) {
      var video = event.mediaElement;
      videoContainer.appendChild(video);
    }

  }

  shareScreen() {
    var videoContainerScreen = document.getElementById('screen');
    this.connection.addStream({
      screen: true,
      oneway: true,
      streamCallback: function (stream) {
        stream.isScreen = true;
        console.log('Screen is successfully captured: ' + stream.getVideoTracks().length);
      }
    });
  }

  onVideo(num) {    
    this.connection.openOrJoin('predefiend-roomid');
  }

  onMute() {
    this.connection.attachStreams[0].mute('audio');
    this.connection.updateExtraData();
 }

  onSpeak() {
    this.connection.attachStreams[0].unmute('audio');
    this.connection.updateExtraData();
  }

  onVideoStop() {
    this.connection.attachStreams[0].mute('video');
    this.connection.updateExtraData();
  }

  onVideoStart() {
    this.connection.attachStreams[0].unmute('video');
    this.connection.updateExtraData();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogboxComponent, {
      panelClass: 'my-centered-dialog',
    });
  }

openInviteDialog() {
    const dialogRef = this.dialog.open(HeaderComponent, {
      width: '350px',
      height: '300px'
    });
  }

  endMeeting() {
    window.localStorage.clear();
    this.router.navigate(["/"]);
  }

  changeType(value) {
    
    if(value==true)
    {
      this.onSpeak();      
    }
    else{
    this.onMute();
    }
    this.toggle1=!this.toggle1
  }

  changeVideo(value)
  {
    if(this.flag==1){
        this.connection.openOrJoin('predefiend-roomid');  
        this.flag++; 
        console.log(this.flag + "flag")   
    }
    if(value==true)
    {
      this.onVideoStart(); 
      console.log(value + "value")   
    }
    else{
    this.onVideoStop();
    console.log(value + "value")   
    }
    this.toggle2=!this.toggle2
  }
}
