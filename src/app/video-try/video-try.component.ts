import {Component, OnInit, ViewChild} from '@angular/core';
import Peer from 'peerjs';
import { SocketcommService } from '../service/socketcomm.service'


@Component({
  selector: 'app-video-try',
  templateUrl: './video-try.component.html',
  styleUrls: ['./video-try.component.css']
})

export class VideoTryComponent implements OnInit {
  @ViewChild('myvideo', { static: true }) myVideo: any;

  peerID;
  anotherPeerID;
  peer;
  //chat code
  public msgList :any[]=[];
  public user;
  public msg;

  constructor( private socketCommService: SocketcommService ) { }

  ngOnInit() {

   let video = this.myVideo.nativeElement;
   this.peer = new Peer({host:'peerjs-server.herokuapp.com', secure:true, port:443})
   setTimeout(() => {
   this.peerID = this.peer.id;
    }, 3000);

    this.peer.on('connection', function(conn){
      conn.on('data', function(data){
        console.log(data);
      });
    });

    var n  = <any>navigator;

    debugger;

    n.getUserMedia = (n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia);
    this.peer.on('call', function(call){
      n.getUserMedia({video:false, audio: true}, function(stream){
        call.answer(stream);
        call.on('stream', function(remotestream){
          video.srcObject = remotestream;
          video.play();
        })
      }, function(err){
        console.log('Faild to Load', err);
      });
    });

    // chat code
    this.socketCommService.serverJoinRoom().subscribe(
      (res)=>{
        console.log("server response "+res)
        this.msgList.push(res)
    },
    (err)=>
    {
      console.log("server error "+err)
    })

    // message communication
    this.socketCommService.serverNewMessage().subscribe(
      (res)=>{
        this.msgList.push(res)
      },
      (err)=>{
        console.log("server error "+err)
      }
    );
  }

  connect(){
    var conn = this.peer.connect(this.anotherPeerID);
    conn.on('open', function(){
    conn.send('Hi....!');
    });
    
    this.socketCommService.joinRoom('Pooja joined',this.anotherPeerID)
   
  }

  sendMessage()
  {
    console.log(this.msg)
    this.msgList.splice(0 ,0 ,this.msg);
    this.socketCommService.sendMessageClient(this.user,this.msg)
   
  }


  Videoconnect(){
    let video = this.myVideo.nativeElement;
    var localvar = this.peer;
    var fname = this.anotherPeerID;
    var n = <any>navigator;
    n.getUserMedia = (n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia);
    n.getUserMedia({video:true, audio: true}, function(stream){
      var call = localvar.call(fname, stream);
       }, function(err){
       console.log('Faild to Load', err);
     });
  }

  async ScreenShare(){
    var n = <any>navigator;
    let screenStream = await n.mediaDevices.getDisplayMedia({
      video: true
  });
   this.peer.call(this.anotherPeerID, screenStream);
   }

 
}
