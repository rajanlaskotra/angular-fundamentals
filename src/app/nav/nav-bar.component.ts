import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Session } from 'protractor';
import { IEvent, ISession } from '../events/shared/event.model';
import { EventService } from '../events/shared/event.service';
import { AuthService } from '../user/auth.service';

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styles: [`
        .nav.navbar-nav { font-size: 15px;}
        #searchForm { margin-right: 100px;}
        @media (max-width: 1200px) {#searchForm {display:none}}
        li > a.activeClass { color: #f78; }
    `]
})

export class NavBarComponent implements OnInit{ 
    searchTerm: string = ""
    foundSessions: ISession[]
    events: IEvent[]
    constructor(private auth: AuthService, private eventService: EventService, private route: ActivatedRoute){
        
    }

    ngOnInit() {
        //gets all events to display in nav-bar Event dropdown
        this.eventService.getEvents().subscribe(data => {
            this.events = data
        })
    }
    isAuthenticated() {
        return this.auth.isAuthenticated()
    }

    searchSession(searchTerm){
        this.eventService.searchSession(searchTerm).subscribe(session => {
            this.foundSessions = session
        })
    }
}