import { post } from './cmn';

/**
 * @description 로그인
 */
export const sgnn = user => post({ url: '/user/sgnn', data: { user } })();

export const test = 'eslint';
