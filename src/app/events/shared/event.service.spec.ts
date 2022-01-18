import { EventService } from './event.service';
import { IEvent } from './event.model';
import { of } from 'rxjs';

const Events = [{id: 1, name: 'ngAngular', time: '7:00am'},
                {id: 2, name: 'Angular 8', time: '8:00am'},
                {id: 2, name: 'Angular 9', time: '9:00am'}]

//using the isolated unit testing. with self constructing*.
describe('EventService', () => {
    let eventService: EventService
    let mockHttp
    beforeEach(() => {
        mockHttp = jasmine.createSpyObj('mockHttp',['get','post'])
        eventService = new EventService(mockHttp)   // *
    })

    it('should get all events', () => {
        mockHttp.get.and.returnValue(of(Events))
        eventService.getEvents()

        expect(mockHttp.get).toHaveBeenCalledWith('/api/events')
    })

    it('should get a particular event', () => {
        let eventId = 3
        mockHttp.get.and.returnValue(of(Events[eventId]))
        eventService.getEvent(eventId)

        expect(mockHttp.get).toHaveBeenCalledWith('/api/events/'+eventId)
    })

    it('should save a event', () => {
        const event = {id:4, name: 'Angular India', time: '9:00am'}
        mockHttp.post.and.returnValue(of(event))
        eventService.saveEvent(event)

        expect(mockHttp.post).toHaveBeenCalledWith('/api/events',event, jasmine.any(Object))
    })
    

})