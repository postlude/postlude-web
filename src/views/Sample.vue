<template>
    <div>
        sample.vue

        <el-row>
            <el-button>Default</el-button>
            <el-button type="primary" @click="alertTest">
                Primary
            </el-button>
            <el-button type="success">
                Success
            </el-button>
            <el-button type="info">
                Info
            </el-button>
            <el-button type="warning">
                Warning
            </el-button>
            <el-button type="danger">
                Danger
            </el-button>
        </el-row>
    </div>
</template>

<script>
// import { alert } from '../util/test';

export default {
    name: 'Sample',
    component: {

    },
    methods: {
        alertTest() {
            this.$root.alert({
                mssage: 'message',
                // type: 'info',
                title: 'aaaaaaaaaaaaaaaa',
                // cnfirmBtnText: '확인'
                callback: this.func,
                center: true
            });
        },
        func() {
            console.log('call func');
        }
    }
};
</script>

<style>

</style>
