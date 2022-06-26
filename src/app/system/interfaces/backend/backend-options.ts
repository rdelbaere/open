import { HttpParams } from "@angular/common/http";

export interface BackendOptions{
    withAuthentication?: boolean,
    params?: HttpParams,
}

export const DefaultBackendOptions: BackendOptions = {
    withAuthentication: true,
};
