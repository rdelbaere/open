import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { BackendToken } from "../../interfaces/backend/backend-token";

@Injectable({
    providedIn: 'root'
})
export class TokenUtil {
    isExpired(token: string|BackendToken): boolean {
        if(typeof token == "string"){
            token = this.decode(token);
        }

        return token.exp <= Date.now() / 1000;
    }

    decode(token: string): BackendToken {
        return jwt_decode(token);
    }
}
