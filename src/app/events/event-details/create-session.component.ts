import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISession } from '../shared/event.model';
import { restrictedWords } from '../shared/restricted-words.validators';

@Component({
    selector: 'create-session',
    templateUrl: './create-session.component.html',
    styles: [`
        em { float: right; color: #e25; padding-left: 10px; }
        .error input, .error select, .error textarea  {background-color: #e3c3c5;}
        .error ::-webkit-input-placeholder { color: #999; }
    `]
})
export class CreateSessionComponent implements OnInit {
    newSessionForm: FormGroup
    name: FormControl
    presenter: FormControl
    duration: FormControl
    level: FormControl
    abstract: FormControl

    @Output() newSession = new EventEmitter()
    @Output() cancelAddSession = new EventEmitter()

    ngOnInit() {
        this.name = new FormControl('', Validators.required)
        this.presenter = new FormControl('', Validators.required)
        this.duration = new FormControl('', Validators.required)
        this.level = new FormControl('', Validators.required)
        this.abstract = new FormControl('', [Validators.required, Validators.maxLength(100), restrictedWords(['foo','bar'])])

        this.newSessionForm = new FormGroup({
            name: this.name,
            presenter: this.presenter,
            duration: this.duration,
            level: this.level,
            abstract: this.abstract
        })
    }

     //custom-validator - made reusable by putting in different file

    // private restrictedWords(words){
    //     return (control: FormControl) : {[key:string]:any} => {   // return inner function(lambda function)
            
    //         if(!words) return null
    //         let invalidWords = words
    //                          .map(w => control.value.includes(w) ? w : null)
    //                          .filter(w => w != null)
        
    //         return invalidWords && invalidWords.length > 0 ? { 'restrictedWords': invalidWords.join(', ') } : null
    //     }
    // }

    saveSession(formValue) {
        let session: ISession = {
            id: undefined,
            name: formValue.name,
            presenter: formValue.presenter,
            duration: +formValue.duration,
            level: formValue.level,
            abstract: formValue.abstract,
            voters: [] 
        }
        this.newSession.emit(session)
    }

    cancel() {
        this.cancelAddSession.emit()
    }
}