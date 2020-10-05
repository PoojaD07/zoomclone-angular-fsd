import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoTryComponent } from './video-try/video-try.component';
import { VideoWithPeerComponent } from './video-with-peer/video-with-peer.component';
import { FormsModule } from '@angular/forms';
import { SocketcommService } from '../app/service/socketcomm.service'

@NgModule({
  declarations: [
    AppComponent,
    VideoTryComponent,
    VideoWithPeerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [SocketcommService],
  bootstrap: [AppComponent]
})
export class AppModule { }
