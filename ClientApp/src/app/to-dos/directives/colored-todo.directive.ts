import { Directive, Renderer2, ElementRef, OnInit, Input } from '@angular/core';
import { Importance } from '@todo-enums';
import { Todo } from '../models/todo.model';

@Directive({
    selector: '[appColoredTodo]'
})
export class ColoredTodoDirective implements OnInit {

    @Input('todo')
    public Todo : Todo;

    constructor(private renderer : Renderer2, private el : ElementRef) { }

    ngOnInit() : void {
        let color : string;
        
        switch (this.Todo.Importance) {
            case Importance.High:
                color = "#FF9900";
                break;
            case Importance.Middle:
                color = "#eedd47";
                break;
            case Importance.Low:
                color = "#8EB1D9";
                break;
            default:
                color = "transparent";
                break;
        }

        if (this.Todo.IsDone) {
            color = "#8CD055";
        }

        this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
    }
}
