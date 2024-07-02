import { setCookie, getCookie, deleteCookie } from 'cookies-next';

type SetCookieNextDataType = {
  name: string;
  value: string;
  option?: { expires: number };
};

class CookieNextLib {
  //   name: string;
  //   value: string;
  //   option?: { expires: number };

  //   constructor(name: string, value: string, option?: { expires: number }) {
  //     this.name = name;
  //     this.value = value;
  //     this.option = option;
  //   }

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
