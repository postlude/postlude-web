<template>
    <dev-doc-save @save="addDevDoc" />
</template>

<script>
import DevDocSave from '@/components/dev-doc/DevDocSave.vue';
import { addDevDoc } from '@/api/devDoc';
import { RSPNS } from '@/util/dfn';

export default {
    name: 'DevDocAdd',
    components: {
        DevDocSave
    },
    methods: {
        async addDevDoc({ devDoc, tagAry }) {
            try {
                const { code } = await addDevDoc({ devDoc, tagAry });

                if (code === RSPNS.SUCCES) {
                    this.$message({ type: 'success', message: '등록 성공' });
                } else {
                    throw code;
                }
            } catch (err) {
                console.error(err);
                this.$message({ type: 'error', message: '에러가 발생했습니다.' });
            }
        }
    }
};
</script>
