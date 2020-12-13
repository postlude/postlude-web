import Vue from 'vue';
import Vuex from 'vuex';
import MobileDetect from 'mobile-detect';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        md: new MobileDetect(window.navigator.userAgent),
        isSgnn: false
    },
    getters: {
        isPhone: state => !!state.md.phone(),
        isTblt: state => !!state.md.tablet(),
        isSgnn: state => state.isSgnn
    },
    mutations: {
        setSgnnSttus(state, sttus) {
            state.isSgnn = sttus;
        }
    },
    actions: {
    },
    modules: {
    }
});
