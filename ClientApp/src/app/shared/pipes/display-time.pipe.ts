import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '@todo-models';

@Pipe({
    name: 'displayTime'
})
export class DisplayTimePipe implements PipeTransform {
    transform(item: Todo): string {
        if (!item || !item.Date || !item.HasTime) return '';

        const date = new Date(item.Date);
        const minuteText = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;

        return `[${date.getHours()}:${minuteText}]`;
    }
}
