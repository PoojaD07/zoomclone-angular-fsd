import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoWithPeerComponent } from './video-with-peer.component';

describe('VideoWithPeerComponent', () => {
  let component: VideoWithPeerComponent;
  let fixture: ComponentFixture<VideoWithPeerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoWithPeerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoWithPeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
