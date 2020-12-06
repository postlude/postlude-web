import {
    post, get, put, del
} from './cmn';

/**
 * @description 실행문 검색
 */
export const getExecStmtList = params => get({ url: '/exec-stmt/list', params })();

/**
 * @description 실행문 추가
 */
export const addExecStmt = data => post({ url: '/exec-stmt', data })();

/**
 * @description 실행문 삭제
 */
export const rmExecStmt = idx => del({ url: `/exec-stmt/${idx}` })();

/**
 * @description 실행문 1개 로드
 */
export const getExecStmt = idx => get({ url: `/exec-stmt/${idx}` })();

/**
 * @description 실행문 수정
 */
export const mdfyExecStmt = data => put({ url: '/exec-stmt', data })();
