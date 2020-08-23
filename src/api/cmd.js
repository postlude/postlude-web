import { post, get } from './common';

/**
 * @description 명령어 저장
 * @param {Object} data
 */
export const saveCmd = data => post({ url: '/cmd', data })();

/**
 * @description 메인 명령어 1개 loads
 */
export const getMainCmd = () => get({ url: '/main-cmd' })();

/**
 * @description 명령어 검색
 * @param {Object} params { page, mainCmd }
 */
export const getCmdList = params => get({ url: '/cmd/list', params })();
