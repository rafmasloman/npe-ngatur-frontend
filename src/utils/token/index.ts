import CookieLibs from '../../libs/cookie-next';

class TokenConfig {
  tokenName: string;

  constructor() {
    this.tokenName = 'authToken';
  }

  setToken(token: string) {
    const tokenItem = CookieLibs.setCookie({
      name: this.tokenName,
      value: token,
    });

    return tokenItem;
  }

  getToken() {
    const tokenItem = CookieLibs.getCookie(this.tokenName);

    return tokenItem;
  }

  removeToken() {
    const tokenRemove = CookieLibs.deleteCookie(this.tokenName);

    return tokenRemove;
  }
}

const TokenUtils = new TokenConfig();

export default TokenUtils;
