<template>
    <v-container>
        <cmd-save :loading="loading" @rgst="rgstMainCmd" />
    </v-container>
</template>

<script>
import { RSPNS } from '@/util/define';
import { saveMainCmd } from '@/api/mainCmd';
import CmdSave from './CmdSave.vue';

export default {
    name: 'MainCmdSave',
    components: {
        CmdSave
    },
    data() {
        return {
            loading: false
        };
    },
    methods: {
        /**
         * @description 메인 명령어 등록
         */
        async rgstMainCmd(mainCmd) {
            try {
                await this.$confirm('등록하시겠습니까?', '메인 명령어 등록', { type: 'warning' });

                this.loading = true;

                const { cmd, optnList } = mainCmd;
                const { code, mainCmdIdx } = await saveMainCmd({
                    mainCmd: cmd,
                    optnList
                });

                if (code === RSPNS.SUCCES) {
                    this.$store.commit('setMainCmd', {
                        mainCmd: {
                            idx: mainCmdIdx,
                            ...cmd
                        },
                        optnList
                    });
                    this.$message({ message: '등록되었습니다.', type: 'success' });
                } else {
                    throw new Error('[MainCmdSave] rgstMainCmd - ERROR');
                }
            } catch (err) {
                if (err !== 'cancel') {
                    console.error(err);
                    this.$message({ type: 'error', message: '에러가 발생했습니다.' });
                }
            } finally {
                this.loading = false;
            }
        }
    }
};
</script>
