import { createStore } from 'vuex';
import Cookie from 'js-cookie';

const accessToken = {
	name: 'access-token',
	expires: 1 // 1d
};

export default createStore({
	state: {
		isSignIn: false
	},
	getters: {
		isSignIn: state => state.isSignIn
	},
	mutations: {
		setSignIn(state, isSignIn) {
			state.isSignIn = isSignIn;
		},
		setAccessToken(state, token) {
			const { name, expires } = accessToken;
			Cookie.set(name, token, { expires });
			state.isSignIn = true;
		},
		removeAccessToken(state) {
			Cookie.remove(accessToken.name);
			state.isSignIn = false;
		}
	},
	actions: {
	},
	modules: {
	}
});
