import {
    post, get, put, del
} from './cmn';

/**
 * @description 개발 링크 검색
 */
export const getDevLinkList = params => get({ url: '/dev-link/list', params })();

/**
 * @description 개발 링크 추가
 */
export const addDevLink = data => post({ url: '/dev-link', data })();

/**
 * @description 개발 링크 삭제
 */
export const rmDevLink = idx => del({ url: `/dev-link/${idx}` })();

/**
 * @description 개발 링크 1개 로드
 */
export const getDevLink = idx => get({ url: `/dev-link/${idx}` })();

/**
 * @description 개발 링크 수정
 */
export const mdfyDevLink = data => put({ url: '/dev-link', data })();
