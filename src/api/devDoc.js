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

/**
 * @description 개발 문서 삭제
 */
export const rmDevDoc = idx => del({ url: `/dev-doc/${idx}` })();

/**
 * @description 개발 문서 1개 로드
 */
export const getDevDoc = idx => get({ url: `/dev-doc/${idx}` })();

/**
 * @description 개발 문서 수정
 */
export const mdfyDevDoc = data => put({ url: '/dev-doc', data })();
