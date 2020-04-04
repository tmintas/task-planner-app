import { Directive, Renderer2, ElementRef, OnInit, Input } from '@angular/core';
import { Importance } from '@todo-enums';

@Directive({
    selector: '[coloredImportance]'
})
export class ImportanceBgDirective implements OnInit {

    @Input('importance')
    public Importance : Importance;

    constructor(private renderer : Renderer2, private el : ElementRef) { }

    ngOnInit() : void {
        let color : string;
        
        switch (this.Importance) {
            case Importance.High:
                color = "#ee7474";
                break;
            case Importance.Middle:
                color = "#eedd47";
                break;
            case Importance.Low:
                color = "#84c8dd";
                break;
            default:
                color = "transparent";
                break;
        }

        this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
    }
}
