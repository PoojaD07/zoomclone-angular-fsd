import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';
import * as io from 'socket.io-client'
import { OnInit } from "@angular/core"
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmationBoxComponent } from '../app/confirmation-box/confirmation-box.component';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SenddataService implements OnInit {

  ngOnInit() {

  }

  private socket = io("http://localhost:3000")
  dbUrl = 'http://localhost:8080/api/employees';
  dbUrl1 = 'http://localhost:8080/api/employees/room';

  constructor(private _http: HttpClient, private modalService: NgbModal) { }

  forgotUser(mail): Observable<any> {
    console.log('in serv ');
    console.log(mail);

    return this._http.post(this.dbUrl + '/forgotpw', { mail: mail });
  }

  createUser(user): Observable<any> {
    console.log('create data ');

    return this._http.post(this.dbUrl + '/createuser', user)

  }


  sendOTP(mail): Observable<any> {
    console.log('sending data ');
    console.log('sending data ' + mail);
    // return this._http.post(`${this.dbUrl}/sendotp`,mail);
    return this._http.post(this.dbUrl + '/sendotp', { mail: mail });

  }


  findAll(credentials): Observable<any> {
    return this._http.post(this.dbUrl + '/signin',
      {
        mail: credentials.value.mail,
        password: credentials.value.password
      }, httpOptions
    )
  }


  scheduleMeeting(emp, mail): Observable<any> {

    return this._http.post(`${this.dbUrl}/schedulemeeting`, { emp, mail: mail }, httpOptions)
  }



  update(mail, otp, data): Observable<any> {
    console.log("in update auth");
    return this._http.put(`${this.dbUrl}/${mail}/${otp}`, data)
  }



  checkUser(userId, mail): Observable<any> {
   localStorage.setItem('data', mail);
   console.log(mail);
    return this._http.get(`${this.dbUrl}/${userId}/${mail}`);
  }


  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };

  }



  joinRoom(user, room) {
    this.socket.emit('new_joinee', {
      name: user,
      room: room
    })
  }
  serverJoinRoom() {
    return new Observable((observer) => {
      this.socket.on('server_new_joinee', (data) => {
        // return new Observable((observer)=>{
        observer.next(data);
        // })
      })
    })
  }


  fetchName(room): Observable<any> {

    return this._http.post(`${this.dbUrl1}`, { room: room });

  }


  fetchData(mail) {
    return this._http.get(`${this.dbUrl}/${mail}`);

  }
  sendMessageClient(user, msg, room) {
    this.socket.emit('client_new_msg', {
      name: user,
      msg: msg,
      room: room
    })
  }
  serverNewMessage() {
    return new Observable((observer) => {
      this.socket.on('server_new_message', (data) => {
        // return new Observable((observer)=>{
        observer.next(data);
        // })
      })
    })
  }

  fetchHistory(mail: string): Observable<any> {

    return this._http.post(`${this.dbUrl}/meetinghistory`, { hostmail: mail });

  }

  public confirm(
    message: string,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancel',
    dialogSize: 'sm' | 'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmationBoxComponent, { size: dialogSize });
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }
} 