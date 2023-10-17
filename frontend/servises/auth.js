export class Auth {


    static tokens = {
        accessToken: null,
        refreshToken: null,
    }
    //
    // static accessTokenKey = 'accessToken';
    // static refreshTokenKey = 'refreshToken';

    static setTokens(accessToken, refreshToken) {
        localStorage.setItem(this.tokens.accessToken, accessToken);
        localStorage.setItem(this.tokens.refreshToken, refreshToken);
    }
}