export class User {
    UserName : string;
    Token : string;

    constructor(userName : string, token : string) {
        this.UserName = userName;
        this.Token = token;
    }
}