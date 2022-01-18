import { TestBed } from '@angular/core/testing';
import { VoterService } from './voter.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { ISession } from '../shared/event.model';

const session = {
    id: 1,
    name: "Angular Session",
    voters: ["John","Joe"]
}

describe('VoterService', () => {
    let voterService: VoterService
    let httpMock: HttpTestingController

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [
              VoterService
            ]
          });
          voterService = TestBed.get(VoterService);
          httpMock = TestBed.get(HttpTestingController);
    });

    it('should delete voter', () => {
        let eventId = 6
        let voterName="John"
        voterService.deleteVoter(eventId, <ISession>session, voterName)

        let req = httpMock.expectOne(`/api/events/${eventId}/sessions/${session.id}/voters/${voterName}}`)
        expect(req.request.method).toBe('DELETE')
        httpMock.verify()

        expect(session.voters.some(voter => voter !== 'John')).toBeTrue()
    })

    it('should add a voter', () => {
        let eventId = 6
        let voterName="Daniel"
        voterService.addVoter(eventId, <ISession>session, voterName)

        let req = httpMock.expectOne(`/api/events/${eventId}/sessions/${session.id}/voters/${voterName}}`)
        expect(req.request.method).toBe('POST')
        httpMock.verify()

        expect(session.voters.some(voter => voter === 'Daniel')).toBeTrue()
    })

    it('check userHasVoted', () => {
        let resTrue = voterService.userHasVoted(<ISession>{id: 1, voters: ['John','Papa']}, "John")
        let resFalse = voterService.userHasVoted(<ISession>{id: 1, voters: ['John','Papa']}, "Mary")
        
        expect(resTrue).toBeTrue()
        expect(resFalse).toBeFalse()
    })

})


// alternative for mock Http without HttpClientTestingModule.

// beforeEach(() => {
//     mockHttp = jasmine.createSpyObj('mockHttp',['delete','post'])   //creates mock objects
//     VoterService = new VoterService(mockHttp)
// });

// it('should delete voter', () => {
//     let eventId = 6
//     let voterName="John"
//     voterService.deleteVoter(eventId, <ISession>session, voterName)
//     mockHttp.delete.and.returnValue(of(false))                       //return obs. whenever delete method is called

//     expect(session.voters.length).toBe(1)
//     expect(mockHttp.delete).toHaveBeenCalledWith(`/api/events/${eventId}/sessions/${session.id}/voters/${voterName}}`)
// });