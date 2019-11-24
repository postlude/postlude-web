import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
    router,
    store,
    methods: {
        /**
         * @description Element UI alert 호출 함수
         * @param {Object} param { mssage, type = 'info', title = '', cnfirmBtnText = '확인', callback, center = false }
         */
        alert({
            mssage, type = 'info', title = '', cnfirmBtnText = '확인', callback, center = false
        }) {
            this.$alert(mssage, title, {
                type,
                confirmButtonText: cnfirmBtnText,
                callback,
                center
            });
        }
    },
    render: h => h(App)
}).$mount('#app');
