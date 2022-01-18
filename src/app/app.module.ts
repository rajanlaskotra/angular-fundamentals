import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { EventAppComponent } from './event-app.component';
import { EventsListComponent } from './events/events-list.component';
import { EventThumbnailComponent } from './events/event-thumbnail.component';
import { NavBarComponent } from './nav/nav-bar.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { CreateEventComponent } from './events/create-event.component';
import { Error404Component } from './error/404.component';

import { EventService } from './events/shared/event.service';
import { TOASTR_TOKEN, Toastr } from './common/toastr.service';
import { JQUERY_TOKEN } from './common/jQuery.service';
import { EventListResolver } from './events/event-list-resolver.service';

import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateSessionComponent } from './events/event-details/create-session.component';
import { SessionListComponent } from './events/event-details/session-list.component';
import { CollapsibleWellComponent } from './common/collapsible-well.component';
import { DurationPipe } from './events/shared/duration.pipe';
import { SimpleModalComponent } from './common/simple-modal.component';
import { ModalTriggerDirective } from './common/modal-trigger.directive';
import { UpvoteComponent } from './events/event-details/upvote.component';
import { VoterService } from './events/event-details/voter.service';
import { LocationValidatorDirective } from './events/location-validator.directive';
import { EventResolver } from './events/event-resolver.service';

let toastr: Toastr = window['toastr']
let jquery = window['$']

@NgModule({
  declarations: [
    EventAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    SimpleModalComponent,
    UpvoteComponent,
    DurationPipe,
    ModalTriggerDirective,
    LocationValidatorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    EventService, //short-form
    { 
      provide: TOASTR_TOKEN, 
      useValue: toastr
    },
    {
      provide: JQUERY_TOKEN,
      useValue: jquery
    },
    EventResolver,
    EventListResolver,
    //long-form 
    {
      provide: 'canRouteDeactivate',
      useValue: checkDirtyState
    },
    AuthService,
    VoterService
  ],
  bootstrap: [EventAppComponent]
})
export class AppModule { }

//canDeactivate - route Guard
export function checkDirtyState(component: CreateEventComponent) {
  if(component.isDirty)
    return window.confirm("You haven't saved this event, do you really want to cancel ?")
  return true
}
