import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from './shared/event.model';
import { EventService } from './shared/event.service';

@Component({
    selector:'events-list',
    template: `
    <div>
        <h1>Upcoming Angular Events</h1>
        <hr/>

        <div class="rows">
            <div *ngFor="let Event of events" class="col-md-5">
                <event-thumbnail [event]="Event"></event-thumbnail>
            </div>
        </div>

    <!--    <event-thumbnail (eventClick)="handleEventClicked($event)" 
        [event]="event1"></event-thumbnail>   -->

    <!--    <event-thumbnail #templateVar [event]="event1"></event-thumbnail>
        <h3> {{templateVar.someProperty}} </h3>
        <button class="btn btn-primary" (click)="templateVar.logFoo()">Log Foo</button>  -->

    </div>
    `
})
export class EventsListComponent implements OnInit{
    events: IEvent[]

    constructor(private eventService: EventService, private route: ActivatedRoute) {}

    ngOnInit() {
    //1.   this.events = this.eventService.getEvents() 

        //2.  this.eventService.getEvents().subscribe(events => {
        //     this.events = events
        // })
    
        //3.
        this.events=this.route.snapshot.data['events'] //using resolver, see app-routing.module.ts
    }

    /*handleEventClicked(data) {
        console.log("Received : ", data)
    }*/
}