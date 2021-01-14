import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({ selector: '[appFocusFirstInvalidOnsubmit]' })
export class FocusFirstInvalidOnsubmitDirective {
    constructor(private host: ElementRef) {}

    @HostListener('submit', ['$event'])
    OnSubmit() : void {
        const firstInvalid = Object.values(this.host.nativeElement)
            .find(el => el instanceof HTMLInputElement && (el as HTMLInputElement).classList.contains('ng-invalid'));

        if (firstInvalid) {
            (firstInvalid as HTMLInputElement).focus();
        }
    }
}
