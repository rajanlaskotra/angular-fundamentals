import { SessionListComponent } from './session-list.component';
import{ ISession } from '../shared/event.model';

describe('SessionListComponent-Isolated', () => {
    let component : SessionListComponent
    let mockAuthService, mockVoterService

    beforeEach(() => {
        component = new SessionListComponent(mockAuthService, mockVoterService)
    })

    describe('ngOnChanges', () => {
        it('should filter sessions', () => {
            component.sessions = <ISession[]>[{id: 1, name: 'Session 1', level: 'Beginner'},
                                            {id: 2, name: 'Session 3', level: 'Intermediate'},{id: 3, name: 'Session 2', level: 'Intermediate'}]
            component.sFilterBy = 'intermediate'
            component.sSortBy = 'name'
            component.eventId = 6

            component.ngOnChanges()

            expect(component.filteredSessions.length).toBe(2)
        })

        it('should sort sessions', () => {
            component.sessions = <ISession[]>[{id: 1, name: 'Session 1', level: 'Beginner'},
                                            {id: 2, name: 'Session 3', level: 'Intermediate'},{id: 3, name: 'Session 2', level: 'Intermediate'}]
            component.sFilterBy = 'all'
            component.sSortBy = 'name'
            component.eventId = 6

            component.ngOnChanges()

            expect(component.filteredSessions[2].name).toBe('Session 3')
            
        })
    })

})