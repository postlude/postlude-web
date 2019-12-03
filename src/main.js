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
         * @param {Object} param { mssage, title, callback, center, type = 'info', cnfirmBtnText = '확인' }
         */
        alert({
            mssage, title, callback, center, type = 'info', cnfirmBtnText = '확인'
        }) {
            this.$alert(mssage, title, {
                type,
                confirmButtonText: cnfirmBtnText,
                callback,
                center
            });
        },
        /**
         * @description Element UI confirm 호출 함수
         * @param {Object} param {
         *      cnfirmMssage, title, center, callback, succesMssage,
         *      type = 'warning', cnfirmBtnText = '확인', cancelBtnText = '취소'
         * }
         */
        async cnfirm({
            cnfirmMssage, title, center, callback, succesMssage,
            type = 'warning', cnfirmBtnText = '확인', cancelBtnText = '취소'
        }) {
            try {
                await this.$confirm(cnfirmMssage, title, {
                    type,
                    confirmButtonText: cnfirmBtnText,
                    cancelButtonText: cancelBtnText,
                    center,
                    callback
                });

                if (succesMssage) {
                    this.$message({ type: 'success', message: succesMssage });
                }
            } catch (err) {
                if (err !== 'cancel') {
                    console.error(err);
                    this.$message({ type: 'error', message: '에러가 발생했습니다.' });
                }
            }
        }
    },
    render: h => h(App)
}).$mount('#app');
