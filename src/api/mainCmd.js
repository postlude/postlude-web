import { post, get } from './common';

/**
 * @description 명령어 저장
 * @param {Object} data
 */
export const saveMainCmd = data => post({ url: '/main-cmd', data })();

/**
 * @description 메인 명령어 1개 loads
 */
export const getMainCmd = () => get({ url: '/main-cmd' })();

/**
 * @description 명령어 검색
 * @param {Object} params { page, mainCmd }
 */
export const getCmdList = params => get({ url: '/main-cmd/list', params })();
