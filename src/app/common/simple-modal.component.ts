import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';
import { JQUERY_TOKEN } from './jQuery.service';

@Component({
    selector: 'simple-modal',
    template: `
        <div id="{{elementId}}" #modalContainer class="modal fade" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                        <span>&times;</span></button>
                        <h4 class="modal-title">{{title}}</h4>
                    </div>
                    <div class="modal-body" (click)="cancelModal()">
                        <ng-content></ng-content>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .modal-body { height: 300px; overflow-y: scroll; }
    `]
})
export class SimpleModalComponent {

    @Input() title: string
    @Input() elementId: string
    @ViewChild('modalContainer') containerEl: ElementRef

    constructor(@Inject(JQUERY_TOKEN) private $: any) {

    }
    cancelModal() {
        this.$(this.containerEl.nativeElement).modal('hide')
    }
}