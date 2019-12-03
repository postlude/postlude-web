<template>
    <div>
        sample.vue

        <el-row>
            <el-button>Default</el-button>
            <el-button type="primary" @click="test">
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
export default {
    name: 'Sample',
    component: {

    },
    methods: {
        test() {
            this.$root.cnfirm({
                cnfirmMssage: 'aaaa?'
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
