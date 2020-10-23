import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MeetingsComponent } from './meetings/meetings.component';
import {SigninComponent } from './signin/signin.component';
import {ForgotComponent } from './forgot/forgot.component';
import { JoinmeetingComponent}from './joinmeeting/joinmeeting.component'
import{SignupComponent } from './signup/signup.component'
import{DisplayComponent} from './display/display.component';
import {SetpasswordComponent} from './setpassword/setpassword.component';
import { SharescreenComponent} from './sharescreen/sharescreen.component';
import{SchedulemeetingComponent} from './schedulemeeting/schedulemeeting.component'
import{WelcomeComponent} from'./welcome/welcome.Component';

const routes: Routes = [{path:'',component:MeetingsComponent},
{path:'signin',component:SigninComponent},
{path:'forgot',component:ForgotComponent},
{ path:'joinmeeting',component:JoinmeetingComponent},
{ path:'signup',component:SignupComponent},
{ path:'display',component:DisplayComponent},
{ path:'setpassword',component:SetpasswordComponent},
{ path: 'share',component:SharescreenComponent},
{ path :'schedulemeeting',component:SchedulemeetingComponent},
{ path :'welcome',component:WelcomeComponent},
{ path :'join/:id',component:JoinmeetingComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
