import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ActivatedRoute, Router } from '@angular/router'; 
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatRadioModule} from '@angular/material/radio';
import { MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSortModule} from '@angular/material/sort';
import { MatTableModule,} from '@angular/material/table';
import { from } from 'rxjs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SigninComponent } from './signin/signin.component';
import { JoinmeetingComponent } from './joinmeeting/joinmeeting.component';
import { ForgotComponent } from './forgot/forgot.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { SignupComponent } from './signup/signup.component';
import { DisplayComponent } from './display/display.component';
import { SetpasswordComponent } from './setpassword/setpassword.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SchedulemeetingComponent } from './schedulemeeting/schedulemeeting.component';
import { SharescreenComponent } from './sharescreen/sharescreen.component';
import { WelcomeComponent} from'./welcome/welcome.Component';
import { DialogboxComponent } from './dialogbox/dialogbox.component';
import {SenddataService} from '../app/senddata.service';
import {EventEmitterService} from '../app/event-emitter.service';
import { VideoWithPeerComponent } from './video-with-peer/video-with-peer.component';
import { MeetinghistoryComponent } from './meetinghistory/meetinghistory.component';
import { ConfirmationBoxComponent } from './confirmation-box/confirmation-box.component' ;
import { ClipboardModule } from 'ngx-clipboard';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    JoinmeetingComponent,
    ForgotComponent,
    MeetingsComponent,
    SignupComponent,
    DisplayComponent,
    SetpasswordComponent,
    HeaderComponent,
    SchedulemeetingComponent,
    SharescreenComponent,
    WelcomeComponent,
    DialogboxComponent,
    VideoWithPeerComponent,
    MeetinghistoryComponent,
    ConfirmationBoxComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatRadioModule,
    MatDialogModule,
    HttpClientModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    NgbModule,
    ClipboardModule
  ],
  providers: [SenddataService ,EventEmitterService],
  bootstrap: [AppComponent ]
})
export class AppModule { }
