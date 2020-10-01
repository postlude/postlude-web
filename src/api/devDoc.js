import {
    post, get, put, del
} from './common';

/**
 * @description 개발 문서 검색
 */
export const getDevDocList = params => get({ url: '/dev-doc/list', params })();

/**
 * @description 메인 명령어 1개 loads
 */
export const getMainCmd = () => get({ url: '/main-cmd' })();
