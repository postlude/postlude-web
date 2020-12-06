<template>
    <exec-stmt-save @save="addExecStmt" />
</template>

<script>
import ExecStmtSave from '@/components/exec-stmt/ExecStmtSave.vue';
import { RSPNS } from '@/util/dfn';
import { addExecStmt } from '@/api/execStmt';

export default {
    name: 'ExecStmtAdd',
    components: {
        ExecStmtSave
    },
    methods: {
        async addExecStmt({ execStmt, tagAry }) {
            try {
                const { code } = await addExecStmt({ execStmt, tagAry });

                if (code === RSPNS.SUCCES) {
                    this.$message({ type: 'success', message: '등록 성공' });
                } else {
                    throw new Error(code);
                }
            } catch (err) {
                console.error(err);
                this.$message({ type: 'error', message: '에러가 발생했습니다.' });
            }
        }
    }
};
</script>
