import config from "../../config/config.js";



export class Auth {

    static accessTokenKey = 'accessToken';
    static refreshTokenKey = 'refreshToken';
    static categoriesInfoKey = {};
    static userInfoName = 'userName';



    static async processUnauthorizedResponse() {
        const refreshToken = localStorage.getItem(this.refreshTokenKey);
         if (refreshToken) {
            const response = await fetch(config.host + '/refresh', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({refreshToken: refreshToken})
            });
            if (response && response.status === 200) {
                const result = await response.json();
                if (result && !result.error) {
                    this.setTokens(result.tokens.accessToken, result.tokens.refreshToken);
                    return true;
                } else {
                    throw new Error (result.message);
                }
            }
     }
         this.removeTokens();
        location.href = '#/'
        return false;
    }

    static async logout() {
        const refreshToken = localStorage.getItem(this.refreshTokenKey);
        if (refreshToken) {
            const response = await fetch(config.host + '/logout', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({refreshToken: refreshToken})
            });
            if (response && response.status === 200) {
                const result = await response.json();
                if (result && !result.error) {
                    localStorage.removeItem(Auth.userInfoName);
                    return true;
                }
            }
        }
        Auth.removeTokens();
        localStorage.removeItem(Auth.userInfoName);
    }

    // static setTokens(accessToken, refreshToken) {
    //     let userTokens = {};
    //     userTokens[this.accessTokenKey] = accessToken;
    //     userTokens[this.refreshTokenKey] = refreshToken;
    //     localStorage.setItem(this.tokensKey, JSON.stringify(accessToken));
    //     localStorage.setItem(this.tokensKey, JSON.stringify(refreshToken));
        // localStorage.setItem(this.tokensKey, JSON.stringify(userTokens));
static setTokens(accessToken, refreshToken) {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
    }

    static getCategoriesInfo() {
        const categoriesInfo = localStorage.getItem(this.categoriesInfoKey);
        if (categoriesInfo) {
            return JSON.parse(categoriesInfo);
        }
        return null;
    }

    static removeTokens(accessToken, refreshToken) {
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
    }

    static setUserInfo(info){
        localStorage.setItem(this.userInfoName, JSON.stringify(info));

    }
    static getUserInfo() {
        const userInfoName = localStorage.getItem(this.userInfoName);
               if (userInfoName) {
            return JSON.parse(userInfoName);

        }
        return  null;


    }


}