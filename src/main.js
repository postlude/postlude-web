import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/ko';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.use(ElementUI, { locale });

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    methods: {
        /**
         * @description ElementUI alert
         * @param {Object} arg { title, mssage, cnfirmBtnText, type, callback }
         */
        alert(arg) {
            const {
                title = '', mssage = '', cnfrmBtnTxt = '확인', ty = 'info', callback
            } = arg;

            this.$alert(mssage, title, {
                confirmButtonText: cnfrmBtnTxt,
                type: ty,
                callback
            });
        },
        /**
         * @description ElementUI confirm
         * @param {Object} arg { title, mssage, cnfrmTxt, cancelTxt, ty, excMssageTy, excMssage, cnfrmFunc, fnlyFunc }
         */
        async cnfrm(arg) {
            const {
                title,
                mssage,
                cnfrmTxt,
                cancelTxt,
                ty = 'warning',
                excMssageTy = 'success',
                excMssage,
                cnfrmFunc,
                fnlyFunc = () => {}
            } = arg;

            try {
                await this.$confirm(mssage, title, {
                    confirmButtonText: cnfrmTxt,
                    cancelButtonText: cancelTxt,
                    type: ty
                });

                await cnfrmFunc();

                this.$message({ type: excMssageTy, message: excMssage });
            } catch (e) {
                if (e !== 'cancel') {
                    console.error(e);
                    this.$message({ type: 'error', message: '에러가 발생했습니다.' });
                }
            } finally {
                await fnlyFunc();
            }
        }
    },
    vuetify,
    render: h => h(App)
}).$mount('#app');
