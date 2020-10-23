import { Component, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import * as Peer from 'peerjs';
  
export declare var RTCMultiConnection: any;

@Component({
  selector: 'app-video-with-peer',
  templateUrl: './video-with-peer.component.html',
  styleUrls: ['./video-with-peer.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class VideoWithPeerComponent implements OnInit {

//   peer: Peer;
//   myStream: MediaStream;
//   myEl: HTMLMediaElement;
//   video: HTMLVideoElement;
  
//   connection;
//   constructor(private renderer: Renderer2 , private eventEmitterService: EventEmitterService    ) { }

//   @ViewChild('parent', { static: false }) parent;

  ngOnInit() {
    // this.connection = new RTCMultiConnection();
    // this.connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
    // this.connection.session = {
    //   audio: true,
    //   video: true
  };
  

//   this.connection.sdpConstraints.mandatory ={
//     OfferToReceiveAudio: true,
//     OfferToReceiveVideo: true
//   }


//   var videoContainer = document.getElementById('video-Container');


//   this.connection.onstream= function(event) {
//     var video = event.mediaElement;
//     videoContainer.appendChild(video);
//   }

//   if (this.eventEmitterService.subsVar==undefined) { 
//     console.log("u in subscribe")    
//       this.eventEmitterService.subsVar = this.eventEmitterService.    
//       invokeFirstComponentFunction.subscribe((name:string) => {   
//         console.log("u in subscribe") 
//           this.shareScreen(name);    
//       });    
//     }    
//   }

//   shareScreen(name){
//     console.log("u in share screen puneet")
//     var videoContainerScreen = document.getElementById('screen');
//     this.connection.addStream({
//       screen: true,
//       oneway: true,
//       streamCallback: function(stream) {
//         stream.isScreen = true;
//         console.log('Screen is successfully captured: ' + stream.getVideoTracks().length);
//         //videoContainerScreen.srcObject = stream;
//       }
//   });
//   }

//   ngAfterViewInit(){
//     //this.renderer.setStyle(this.parent.nativeElement.querySelector('video'), 'width', '100%');
// }

//   onVideo(){
//     this.connection.openOrJoin('predefiend-roomid');
//   }

 
 
}

