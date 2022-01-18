import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/user/auth.service';
import { ISession } from '../shared/event.model';
import { VoterService } from './voter.service';

@Component({
    selector: 'session-list',
    templateUrl: './session-list.component.html'
})
export class SessionListComponent implements OnChanges{

    @Input() sessions: ISession[];
    @Input() sFilterBy: string;
    @Input() sSortBy: string;
    @Input() eventId: number;
    filteredSessions: ISession[] = [];

    constructor(private auth: AuthService, private voterService: VoterService) {

    }
    ngOnChanges() {
        if (this.sessions){
            this.filterSessions(this.sFilterBy);
            this.sSortBy === 'name' ? this.filteredSessions.sort(sortByNameAsc) : this.filteredSessions.sort(sortByVoteDesc);
        }
    }

    filterSessions(filterBy) {
        if (filterBy === 'all'){
            this.filteredSessions = this.sessions.slice(0);
        }
        else{
            this.filteredSessions = this.sessions.filter(session => {
                return session.level.toLocaleLowerCase() === filterBy;
            });
        }
    }

    toggleVote(session: ISession) {
        if (this.userHasVoted(session)){
            this.voterService.deleteVoter(this.eventId, session, this.auth.currentUser.userName);
        }
        else {
            this.voterService.addVoter(this.eventId, session, this.auth.currentUser.userName);
        }
        if (this.sSortBy === 'votes'){
            this.filteredSessions.sort(sortByVoteDesc);
        }
    }

    userHasVoted(session: ISession) {
        return this.voterService.userHasVoted(session, this.auth.currentUser.userName);
    }
}



function sortByNameAsc(s1: ISession, s2: ISession) {
    if (s1.name > s2.name) { return 1; }
    else if (s1.name < s2.name) { return -1; }
    else { return 0; }
}

function sortByVoteDesc(s1: ISession, s2: ISession) {
    return s2.voters.length - s1.voters.length;
}
