import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { SessionListComponent } from './session-list.component';
import { ISession } from '../shared/event.model';
import { AuthService } from '../../user/auth.service';
import { VoterService } from './voter.service';
import { By } from '@angular/platform-browser';
import { DurationPipe } from '../shared/duration.pipe';
import { UpvoteComponent } from './upvote.component';
import { CollapsibleWellComponent } from 'src/app/common/collapsible-well.component';

describe('SessionListComponent-Integrated', () => {
    let fixture: ComponentFixture<SessionListComponent>,
    component: SessionListComponent,
    element: HTMLElement,
    debugEl: DebugElement

    beforeEach(async () => {        // TestBed.configureTestingModule is async, so we use async keyword before callback
        let mockAuthService = {
            isAuthenticated: () => true,
            currentUser: { userName: 'John' }
        }
        let mockVoterService = {
            userHasVoted: () => true
        }

        TestBed.configureTestingModule({        
            imports: [],
            declarations: [ 
                SessionListComponent,
                UpvoteComponent,
                CollapsibleWellComponent,
                DurationPipe,
            ],
            providers: [
                { provide: AuthService, useValue: mockAuthService },
                { provide: VoterService, useValue: mockVoterService }
            ]
            //, schemas: [              //Defines a schema that allows any property on any element. 
            //     NO_ERRORS_SCHEMA     // ** for shallow testing without child components **
            // ]
        })
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(SessionListComponent)
        component = fixture.componentInstance
        element = fixture.nativeElement
        debugEl = fixture.debugElement
    })

    describe('Initial display', () => {
        it('should have correct session title',() => {
            component.sessions = [{id: 3, name: 'Session 1', presenter: 'Joe', duration: 1,  level: 'beginner',
                                  abstract: 'abstract', voters: ['John','Bob']}]
            component.sFilterBy = 'all'
            component.sSortBy = 'name'
            component.eventId = 4

            component.ngOnChanges()
            fixture.detectChanges()

            //expect(element.querySelector('[sessionTitle]').textContent).toContain('Session 1')
            expect(debugEl.query(By.css('[sessionTitle]')).nativeElement.textContent).toContain('Session 1') // same as above, but with debugElement
        })
    })
})