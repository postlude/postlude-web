import axios from 'axios';
import Cookie from 'js-cookie';

const isProd = process.env.NODE_ENV === 'production';

class Api {
	constructor() {
		this.baseUrl = isProd ? 'http://api.postlude.me' : 'http://localhost:3000';
		this.apiToken = 'endtheory';
	}

	_getHeaders() {
		const headers = {
			'postludetoken': this.apiToken
		};

		const accessToken = Cookie.get('access-token');
		if (accessToken) {
			headers.Authorization = `Bearer ${accessToken}`;
		}

		return headers;
	}

	async get(url, params) {
		const headers = this._getHeaders();
		return axios.get(`${this.baseUrl}${url}`, { params, headers });
	}

	async post(url, data) {
		const headers = this._getHeaders();
		return axios.post(`${this.baseUrl}${url}`, data, { headers });
	}

	async put(url, data) {
		const headers = this._getHeaders();
		return axios.put(`${this.baseUrl}${url}`, data, { headers });
	}

	async delete(url) {
		const headers = this._getHeaders();
		return axios.delete(`${this.baseUrl}${url}`, { headers });
	}
}

const api = new Api();

/**
 * @description 개발 링크 검색
 */
export const searchDevLinks = params => api.get('/dev-links', params);

/**
 * @description 개발 링크 추가
 */
export const addDevLink = devLink => api.post('/dev-links', devLink);

/**
 * @description 개발 링크 삭제
 */
export const removeDevLink = id => api.delete(`/dev-links/${id}`);

/**
 * @description 개발 링크 수정
 */
export const setDevLink = (id, devLink) => api.put(`/dev-links/${id}`, devLink);

/**
 * @description 로그인
 */
export const signIn = user => api.post('/auth/sign-in', user);