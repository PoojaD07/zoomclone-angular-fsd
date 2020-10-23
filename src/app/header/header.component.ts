import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  room = localStorage.getItem('room');
  constructor() { }

  ngOnInit(): void {
    this.room = localStorage.getItem('room');
  }

}
