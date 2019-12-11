import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ToDoItem } from '@todo-models';

@Component({
    selector: 'app-day-todo-list',
    templateUrl: './day-todo-list.component.html',
    styleUrls: ['./day-todo-list.component.scss']
})
export class DayTodoListComponent implements OnInit {

    public Todos : ToDoItem[];

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.data.pipe(
            map(v => { 
                this.Todos = v.todos;
            })
        ).subscribe();        
    }

}
