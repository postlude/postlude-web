import Vue from 'vue';
import Vuex from 'vuex';
import MobileDetect from 'mobile-detect';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        md: new MobileDetect(window.navigator.userAgent)
    },
    getters: {
        isPhone: state => !!state.md.phone(),
        isTblt: state => !!state.md.tablet()
    },
    mutations: {
    },
    actions: {
    },
    modules: {
    }
});
