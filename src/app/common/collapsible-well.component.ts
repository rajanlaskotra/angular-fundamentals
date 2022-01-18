import { Component, Input } from '@angular/core';

@Component({
    selector: 'collapsible-well',
    template: `
        <div (click)="toggleContent()" class="well pointable">

            <ng-content select="[sessionTitle]"></ng-content>       <!-- select is selector of CSS which can select id, class, element etc -->
            <ng-content select="[sessionBody]" *ngIf="visibleFlag"></ng-content>

        </div>
    `
})
export class CollapsibleWellComponent {
    visibleFlag: boolean = false

    toggleContent() {
        this.visibleFlag = !this.visibleFlag
    }
}