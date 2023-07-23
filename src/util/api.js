import axios from 'axios';

const isProd = process.env.NODE_ENV === 'production';
const baseUrl = isProd ? 'https://postlude.me/api' : 'http://localhost:3000';


/**
 * @description 개발 링크 검색
 */
export const searchDevLinks = (params) => axios.get(`${baseUrl}/dev-links`, { params });

/**
 * @description 개발 링크 추가
 */
// export const addDevLink = data => post({ url: '/dev-link', data })();

/**
 * @description 개발 링크 삭제
 */
export const removeDevLink = (id) => axios.delete(`${baseUrl}/dev-links/${id}`);

/**
 * @description 개발 링크 1개 로드
 */
// export const getDevLink = idx => get({ url: `/dev-link/${idx}` })();

/**
 * @description 개발 링크 수정
 */
// export const mdfyDevLink = data => put({ url: '/dev-link', data })();