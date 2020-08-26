export class User {
    UserName : string;
    AccessToken : string;

    constructor(userName : string, accessToken : string) {
        this.UserName = userName;
        this.AccessToken = accessToken;
    }
}