import Cookie from 'js-cookie';

export const getCookie = name => Cookie.get(name);

export const setCookie = (name, value, optn) => {
    Cookie.set(name, value, optn);
};

export const rmCookie = (name) => {
    Cookie.remove(name);
};
