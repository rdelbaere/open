export interface BackendToken{
    iat: number;
    exp: number;
    email: string;
    roles: Array<string>;
}
