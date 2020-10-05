import { Injectable, ɵConsole } from '@angular/core';
import * as io from 'socket.io-client'
import {OnInit} from "@angular/core"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketcommService implements OnInit  {

  constructor() { }
  private socket =io("http://localhost:3000")
    ngOnInit()
    {

    }
    joinRoom(user,room)
    {
      
      this.socket.emit('new_joinee',{
        name:user,
        room:room
      })
    }

    serverJoinRoom()
    {
      console.log("here server new join - ")
      return new Observable((observer)=>{
        this.socket.on('server_new_joinee',(data)=>{
          // return new Observable((observer)=>{
            console.log("inside server new join - "+data)
            observer.next(data);
          // })
        })
      })
    }

    serverNewMessage()
    {
      return new Observable((observer)=>{
        this.socket.on('server_new_message',(data)=>{
          // return new Observable((observer)=>{
            observer.next(data);
          // })
        })
      })
    }

    
  sendMessageClient(user,msg)
    {
      this.socket.emit('client_new_msg',{
        name: user,
        msg:msg
      })
    }
}

