import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }
clickMe(){
  this.router.navigate(['/signin']);
}
}
