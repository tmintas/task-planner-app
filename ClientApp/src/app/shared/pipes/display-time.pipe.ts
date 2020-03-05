import { Pipe, PipeTransform } from '@angular/core';
import { NgbTime } from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time';

@Pipe({
    name: 'displayTime'
})
export class DisplayTimePipe implements PipeTransform {

    transform(time: NgbTime): string {
        if (!time) return '';
        
        const minuteText = time.minute < 10 ? `0${time.minute}` : `${time.minute}`;
        return `[${time.hour}:${minuteText}]`;
    }

}
