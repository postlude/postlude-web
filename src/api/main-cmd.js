import { post, get } from './common';

/**
 * @description 메인 명령어 생성
 * @param {Object} data
 */
export const saveMainCmd = data => post({ url: '/main-cmd', data })();

/**
 * @description 메인 명령어 1개 loads
 */
export const getMainCmd = () => get({ url: '/main-cmd' })();
