import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharescreenComponent } from './sharescreen.component';

describe('SharescreenComponent', () => {
  let component: SharescreenComponent;
  let fixture: ComponentFixture<SharescreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharescreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharescreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
