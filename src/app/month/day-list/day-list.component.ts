import { Component, Input, ViewEncapsulation, OnInit, OnChanges } from '@angular/core';
import { Day } from '../day/day.model';
import { ToDoItem } from 'app/to-dos/models/to-do-item.model';

@Component({
    selector: 'app-day-list',
    templateUrl: './day-list.component.html',
    styleUrls: ['./day-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DayListComponent implements OnInit, OnChanges {
    ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
        console.clear();
        console.log('[Day list Changes]');
        console.log(`received for ${this.MonthName} `);
        console.log(this.MonthItems);
    }

    ngOnInit(): void {
        console.clear();
        console.log('[Day list Init]');
        console.log(this.Days);
        
        console.log(`received for ${this.MonthName} `);
        console.log(this.MonthItems);
    }

    @Input()
    public Days: Day[];

    @Input()
    public MonthItems: ToDoItem[];

    @Input()
    public MonthName: string;

    public DayItems(day: number): ToDoItem[] {
        return this.MonthItems.filter(i => i.Date.getDate() === day);
    }
}
