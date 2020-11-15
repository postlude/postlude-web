import { get } from './cmn';

/**
 * @description 타입에 따른 모든 태그 리스트 로드
 * @param {number} ty
 */
export const getTagList = ty => get({ url: '/tag/list', params: { ty } })();

export const list = '';
