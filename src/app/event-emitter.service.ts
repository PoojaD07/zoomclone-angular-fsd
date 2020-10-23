import { Injectable, EventEmitter, Output, Input } from '@angular/core';    
import { Subscription } from 'rxjs/internal/Subscription';    
    
@Injectable({    
  providedIn: 'root'    
})    
export class EventEmitterService {    
    
  @Output() invokeFirstComponentFunction = new EventEmitter();    
  subsVar: Subscription; 
  name = '1';   
 
  constructor() { }    
    
  secondButtonClick() {  
      console.log("hi u in event share")
    this.invokeFirstComponentFunction.emit(this.name);    
  }    
} 