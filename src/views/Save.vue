<template>
    <v-card>
        <v-card-title>명령어 등록</v-card-title>

        <v-tabs :centered="true" :grow="true">
            <v-tab>메인 명령어</v-tab>
            <v-tab :disabled="isMainCmdExisted ? false : true">
                서브 명령어
            </v-tab>

            <v-tab-item>
                <main-cmd-save />
            </v-tab-item>
            <v-tab-item>
                <sub-cmd-save />
            </v-tab-item>
        </v-tabs>
    </v-card>
</template>

<script>
import MainCmdSave from '@/components/save/MainCmdSave.vue';
// import SubCmdSave from '@/components/save/SubCmdSave.vue';

export default {
    name: 'Save',
    components: {
        MainCmdSave
        // SubCmdSave
    },
    data() {
        return {
        };
    },
    computed: {
        isMainCmdExisted() {
            return this.$store.getters.mainCmdIdx;
        }
    },
    mounted() {
        this.$store.commit('resetAll');
    },
    methods: {
    }
};
</script>
