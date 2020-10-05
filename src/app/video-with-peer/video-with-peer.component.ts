import { Component, OnInit } from '@angular/core';
import Peer from 'peerjs';


@Component({
  selector: 'app-video-with-peer',
  templateUrl: './video-with-peer.component.html',
  styleUrls: ['./video-with-peer.component.css']
})
export class VideoWithPeerComponent implements OnInit {
  peer: Peer;
  myStream: MediaStream;
  myEl: HTMLMediaElement;
  video: HTMLVideoElement;
  

  constructor() { }

  ngOnInit() {
    this.video = document.querySelector('video');

  }

  getMedia() {
    navigator.getUserMedia({ audio: true, video: true }, (stream) => {
      this.handleSuccess(stream);
    }, (error) => {
      //this.handleError(error);
    });
  }



  handleSuccess(stream: MediaStream) {
    this.myStream = stream;
    this.video.srcObject = stream
  
  }

}
