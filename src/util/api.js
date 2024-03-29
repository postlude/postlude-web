import axios from 'axios';
import Cookie from 'js-cookie';

const isProd = process.env.NODE_ENV === 'production';

class Api {
	constructor() {
		this.baseUrl = isProd ? 'http://api.postlude.me' : 'http://localhost:3000';
	}

	_getHeaders() {
		const accessToken = Cookie.get('access-token');
		return accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined;
	}

	async get(url, params) {
		const headers = this._getHeaders();
		return axios.get(`${this.baseUrl}${url}`, {
			params,
			headers,
			paramsSerializer: {
				// 파라미터에 배열 포함시 대괄호 포함되지 않음
				// https://stackoverflow.com/questions/49944387/how-to-correctly-use-axios-params-with-arrays
				indexes: null
			}
		});
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

export const getAllDevLinkTags = () => api.get('/dev-links/tags');
export const searchDevLinks = params => api.get('/dev-links', params);
export const getDevLink = id => api.get(`/dev-links/${id}`);
export const addDevLink = devLink => api.post('/dev-links', devLink);
export const removeDevLink = id => api.delete(`/dev-links/${id}`);
export const setDevLink = (id, devLink) => api.put(`/dev-links/${id}`, devLink);

export const signIn = user => api.post('/auth/sign-in', user);