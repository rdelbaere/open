import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'simpleFilter',
    pure: false,
})
export class SimpleFilterPipe implements PipeTransform {
    transform(items: any[], value: string, key?: string, match = true): any[] {
        value = value.toLowerCase();
        return items.filter(item => {
            if(key){
                item = item[key];
            }

            return match === item.toLowerCase().indexOf(value) >= 0;
        });
    }
}
