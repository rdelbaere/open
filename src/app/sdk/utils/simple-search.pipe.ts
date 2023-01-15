import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'simpleSearch'
})
export class SimpleSearchPipe implements PipeTransform {
    transform(items: any[], value: string, key?: string): any[] {
        if(!items || !value){
            return items;
        }

        value = value.toLowerCase();
        return items.filter(item => {
            if(key){
                item = item[key];
            }

            return item.toLowerCase().indexOf(value) >= 0;
        });
    }
}
