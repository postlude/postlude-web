import {
    post, get, put, del
} from './common';

/**
 * @description 개발 문서 검색
 */
export const getDevDocList = params => get({ url: '/dev-doc/list', params })();

/**
 * @description 개발 문서 추가
 */
export const addDevDoc = data => post({ url: '/dev-doc', data })();
