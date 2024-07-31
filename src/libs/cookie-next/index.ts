import { setCookie, getCookie, deleteCookie } from 'cookies-next';

type SetCookieNextDataType = {
  name: string;
  value: string;
  option?: { expires: number };
};

class CookieNextLib {
  setCookie(params: SetCookieNextDataType) {
    return setCookie(params.name, params.value);
  }

  getCookie(name: string) {
    return getCookie(name);
  }

  deleteCookie(name: string) {
    return deleteCookie(name);
  }
}

const CookieLibs = new CookieNextLib();

export default CookieLibs;
