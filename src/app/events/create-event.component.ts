import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IEvent } from './shared/event.model';
import { EventService } from './shared/event.service';

@Component({
    selector: 'create-event',
    templateUrl: './create-event.component.html',
    styles: [`
    em { float: right; color: #E56; padding-left: 10px; }
    .error input { background-color: #e3c3c5;}
    .error ::-webkit-input-placeholder { color: #999; }
  `]
})

export class CreateEventComponent {
    isDirty: boolean = true    // for canDeactivate route guard
    newEvent: IEvent
    constructor(private route: Router, private eventService: EventService) {
    
    }

    saveEvent(formValue){
        this.eventService.saveEvent(formValue).subscribe(() => {
            this.isDirty = false
            this.route.navigate(['events'])
        })
    }
    cancel() {
        this.route.navigate(['/events'])
    }
}