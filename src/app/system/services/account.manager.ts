import { Injectable } from '@angular/core';
import { BackendService } from "./backend.service";
import { Credentials } from "../interfaces/backend/credentials";

@Injectable({
  providedIn: 'root'
})
export class AccountManager {
    constructor(private backend: BackendService){}

    authenticate(credentials: Credentials){
        return this.backend.post('/auth', credentials);
    }
}
