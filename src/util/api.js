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
export const addDevLink = devLink => axios.post(`${baseUrl}/dev-links`, devLink);

/**
 * @description 개발 링크 삭제
 */
export const removeDevLink = (id) => axios.delete(`${baseUrl}/dev-links/${id}`);

/**
 * @description 개발 링크 수정
 */
export const setDevLink = (id, devLink) => axios.put(`${baseUrl}/dev-links/${id}`, devLink);

/**
 * @description 로그인
 */
export const signIn = (user) => axios.post(`${baseUrl}/users/sign-in`, user);