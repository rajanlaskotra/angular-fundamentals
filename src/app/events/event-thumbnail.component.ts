import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEvent } from './shared/event.model';

@Component({
    selector: 'event-thumbnail',
    template: `
    <div [routerLink]="['/event',event.id]" class="well hoverwell thumbnail">
        <h2> {{event?.name | uppercase}} </h2>
        <div> Date: {{event?.date | date:"short"}} </div>
        <div [ngClass]="{green: event?.time === '8:00 am',
                         bold: event?.time === '8:00 am', red: event?.time === '10:00 am'}" [ngSwitch]="event?.time">
            Time : {{event?.time}}
            <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
            <span *ngSwitchCase="'10:00 am'">(Late Start)</span>
            <span *ngSwitchDefault>(Normal Start)</span> 
        </div>
        <div [ngStyle]="{color: event?.price > 750 ? '#f22' : '#1f1'}"> 
            Price: {{event?.price | currency:"USD"}} 
        </div>
        <div *ngIf="event?.location">
            <span>Location: {{event?.location?.address}} </span>
            <span class="pad-left"> {{event?.location?.city}}, {{event?.location?.country}} </span>
        </div>
        <!-- <div [hidden]="!event?.onlineUrl">  -->
        <div *ngIf="event?.onlineUrl"> 
            OnlineUrl : {{event?.onlineUrl}} 
        </div>
    <!--    <button class="btn btn-primary" (click)="handleClick()">Click !</button>  -->
    </div>
    `,
    styles:[`
        .green { color: #1f1 !important; }
        .bold { font-weight: bold; }
        .red { color: #f11 !important; }
        .thumbnail { min-height: 210px; margin-left:-12px;}
        .pad-left { margin-left: 5px; }
        .well div { color: #bbb; }
    `]
})
export class EventThumbnailComponent{
    @Input() event: IEvent
    //@Output() eventClick = new EventEmitter()
    //someProperty: any = "Child Component"

    /*handleClick() {
        this.eventClick.emit(this.event.name)
    }

    logFoo() {
        console.log("foo")
    }*/
}