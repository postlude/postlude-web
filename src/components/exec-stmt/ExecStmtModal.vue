<template>
    <v-dialog v-model="isModalOpen" max-width="800" @click:outside="$emit('close')">
        <exec-stmt-save
            :exec-stmt="execStmt" :tag-ary="tagAry" :tag-set="tagSet"
            :ty="2" @save="mdfyExecStmt" @close="$emit('close')"
        />
    </v-dialog>
</template>

<script>
import ExecStmtSave from '@/components/exec-stmt/ExecStmtSave.vue';
import { mdfyExecStmt } from '@/api/execStmt';
import { RSPNS } from '@/util/dfn';

export default {
    name: 'ExecStmtModal',
    components: {
        ExecStmtSave
    },
    props: {
        isModalOpen: {
            type: Boolean,
            default: () => false
        },
        execStmt: {
            type: Object,
            default: () => {}
        },
        tagAry: {
            type: Array,
            default: () => []
        },
        tagSet: {
            type: Set,
            default: () => new Set()
        }
    },
    methods: {
        async mdfyExecStmt(arg) {
            try {
                const { code } = await mdfyExecStmt(arg);

                if (code === RSPNS.SUCCES) {
                    this.$message({ type: 'success', message: '수정 성공' });
                    this.$emit('close');
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
