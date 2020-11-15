<template>
    <dev-link-save :is-add="true" @save="addDevLink" />
</template>

<script>
import DevLinkSave from '@/components/dev-link/DevLinkSave.vue';
import { addDevLink } from '@/api/devLink';
import { RSPNS } from '@/util/dfn';

export default {
    name: 'DevLinkAdd',
    components: {
        DevLinkSave
    },
    methods: {
        async addDevLink({ devLink, tagAry }) {
            try {
                const { code } = await addDevLink({ devLink, tagAry });

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
