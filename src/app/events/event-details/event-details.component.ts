import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IEvent, ISession } from '../shared/event.model';
import { EventService } from '../shared/event.service';

@Component({
    selector: 'event-details',
    templateUrl: './event-details.component.html',
    styles: [`
        .container { padding-left: 20px; padding-right: 20px; }
        .event-image { height: 100px; }
        a { cursor: pointer; }
    `]
})
export class EventDetailsComponent implements OnInit{

    event: IEvent
    addModeFlag: boolean = false
    filterBy: string = "all"
    sortBy: string = "votes"
    constructor(private eventService: EventService, private route: ActivatedRoute) {}

    ngOnInit() {

        // 2. Routing to same component with different 'id' => (event/id) && it uses observables for that
        this.route.params.forEach((params: Params) => {
            this.event = this.route.snapshot.data['event']
            this.addModeFlag = false            // to maintain state
        })

        // 1. gets id value from URL snapshot & calls service method ()
        // this.event = this.eventService.getEvent(+this.route.snapshot.params['id']);
    }

    addSession() {
        this.addModeFlag = true
    }

    saveNewSession(session: ISession) {
        const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id))
        session.id = nextId + 1
        this.event.sessions.push(session)
        this.eventService.saveEvent(this.event).subscribe()
        this.addModeFlag = false
    }
}