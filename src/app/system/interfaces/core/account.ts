export interface AccountSession{
    token: string;
    user: AccountUser;
}

export interface AccountUser{
    id: number;
    email: string;
    roles: Array<string>;
    system: {id: number};
}
