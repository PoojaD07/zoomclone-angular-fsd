import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoTryComponent } from './video-try.component';

describe('VideoTryComponent', () => {
  let component: VideoTryComponent;
  let fixture: ComponentFixture<VideoTryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoTryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoTryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
