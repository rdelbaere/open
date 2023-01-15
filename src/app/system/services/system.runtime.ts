import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SystemRuntime {
    boot(systemId: number){
        console.log(systemId);
    }
}
