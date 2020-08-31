import Vue from 'vue';
import Vuex from 'vuex';
import MobileDetect from 'mobile-detect';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        md: new MobileDetect(window.navigator.userAgent),
        mainCmd: {},
        mainCmdOptnList: [],
        subCmdList: []
    },
    getters: {
        isPhone: state => !!state.md.phone(),
        isTblt: state => !!state.md.tablet(),
        mainCmdIdx: state => state.mainCmd.idx
    },
    mutations: {
        resetAll(state) {
            state.mainCmd = {};
            state.mainCmdOptnList = [];
            state.subCmdList = [];
        },
        setMainCmd(state, payload) {
            const { mainCmd, optnList } = payload;
            state.mainCmd = mainCmd;
            state.mainCmdOptnList = optnList;
        }
    },
    actions: {
    },
    modules: {
    }
});
