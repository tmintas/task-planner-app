import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';

@Directive({ selector: '[appIfHasItemsUnless]' })
export class IfHasItemsDirective implements OnInit {
    private hasView = false;

    ngOnInit(): void {
        this.viewContainer.createEmbeddedView(this.templateRef);
    }

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef) { }

    @Input() set appIfHasItemsUnless(items : any[]) {
        if (items && items.length > 0 && !this.hasView) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true;
        } else if (this.hasView && items.length === 0) {
            this.viewContainer.clear();
            this.hasView = false;
        }
    }
}