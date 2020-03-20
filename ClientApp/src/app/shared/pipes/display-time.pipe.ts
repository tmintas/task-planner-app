import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'displayTime'
})
export class DisplayTimePipe implements PipeTransform {

    transform(date: Date): string {
        if (!date) return '';
        
        const minuteText = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
        return `[${date.getHours()}:${minuteText}]`;
    }

}
