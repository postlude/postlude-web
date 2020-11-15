<template>
    <v-dialog v-model="isModalOpen" max-width="800">
        <dev-link-save
            :dev-link="devLink" :tag-ary="tagAry" :tag-set="tagSet"
            @save="mdfyDevLink"
        />
    </v-dialog>
</template>

<script>
import DevLinkSave from '@/components/dev-link/DevLinkSave.vue';
import { mdfyDevLink } from '@/api/devLink';
import { RSPNS } from '@/util/dfn';

export default {
    name: 'DevLinkModal',
    components: {
        DevLinkSave
    },
    props: {
        isModalOpen: {
            type: Boolean,
            default: () => false
        },
        devLink: {
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
        async mdfyDevLink(arg) {
            try {
                const { code } = await mdfyDevLink(arg);

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
