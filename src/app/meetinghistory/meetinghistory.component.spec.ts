import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetinghistoryComponent } from './meetinghistory.component';

describe('MeetinghistoryComponent', () => {
  let component: MeetinghistoryComponent;
  let fixture: ComponentFixture<MeetinghistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetinghistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetinghistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
