import Axios from 'axios';

const DEFINE = {
    BASE_URL: 'http://localhost:3000',
    CONTENT_TYPE: {
        JSON: 'application/json;charset=UTF-8',
        UPLOAD: 'application/x-www-form-urlencoded'
    }
};

/**
 * @description axios 초기화 함수
 */
const init = ({
    method,
    url,
    params = {},
    data = {},
    baseURL = DEFINE.BASE_URL,
    cntntTy = 'JSON'
}) => async () => {
    try {
        const headers = { 'content-type': DEFINE.CONTENT_TYPE[cntntTy] };

        const { status, data: res } = await Axios({
            baseURL,
            url,
            method,
            params,
            data,
            headers
        });

        if (status === 200) {
            return res;
        } else {
            throw status;
        }
    } catch (e) {
        console.error(e);
        throw e;
    }
};

/**
 * @description axios get 요청 함수
 * @param {Object} params { url, params, auth, baseURL, headers, contentType }
 */
export const get = ({ params, ...args }) => init({
    ...args,
    params: {
        ...params,
        forUncached: Date.now() // IE Cache 방지
    },
    method: 'get'
});

/**
 * @description axios post 요청 함수
 * @param {Object} args { url, data, auth, baseURL, headers, contentType }
 */
export const post = args => init({ ...args, method: 'post' });

/**
 * @description axios put 요청 함수
 * @param {Object} args { url, data, auth, baseURL, headers, contentType }
 */
export const put = args => init({ ...args, method: 'put' });

/**
 * @description axios delete 요청 함수
 * @param {Object} args { url, data, auth, baseURL, headers, contentType }
 */
export const del = args => init({ ...args, method: 'delete' });

/**
 * @description axios 파일 업로드 함수
 * @param {Object} args { url, data, auth, baseURL, headers, contentType }
 */
export const upload = args => init({ ...args, method: 'post', contentType: 'UPLOAD' });
