import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './error/404.component';
import { CreateEventComponent } from './events/create-event.component';
import { CreateSessionComponent } from './events/event-details/create-session.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { EventListResolver } from './events/event-list-resolver.service';
import { EventResolver } from './events/event-resolver.service';
import { EventsListComponent } from './events/events-list.component';
import { UserModule } from './user/user.module';

const routes: Routes = [
    { path: 'event/new', component: CreateEventComponent, canDeactivate: ['canRouteDeactivate']},  //see app.module.ts -> providers
    { path: 'events', component: EventsListComponent, resolve: {events: EventListResolver} },
    { path: 'event/:id', component: EventDetailsComponent, resolve: {event: EventResolver} },
    { path: 'event/session/new', component: CreateSessionComponent },
    { path: '404', component: Error404Component },
    { path: '', redirectTo: '/events', pathMatch: 'full' },
    { path: 'user', loadChildren: ()=>UserModule },  // feature(here user) module for lazy-loading.
    { path: '**', component: Error404Component }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}

