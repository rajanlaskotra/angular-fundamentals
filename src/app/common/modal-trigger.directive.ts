import { Directive, ElementRef, Inject, Input, OnInit } from '@angular/core';
import { JQUERY_TOKEN } from './jQuery.service';

@Directive({
    selector: '[modal-trigger]'
})
export class ModalTriggerDirective implements OnInit {
    private el : HTMLElement
    @Input('modal-trigger') modelTriggerAlias: string

    constructor(@Inject(JQUERY_TOKEN) private $: any, ref: ElementRef) {  
        this.el = ref.nativeElement    //ElementRef, to get access to the underlining native element that our directive is attached-to.
    }
    ngOnInit() {
        this.el.addEventListener('click', e => {
            this.$(`#${this.modelTriggerAlias}`).modal({})
        })

    }
}