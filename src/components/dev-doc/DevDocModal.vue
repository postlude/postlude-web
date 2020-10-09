<template>
    <v-dialog v-model="isModalOpen" max-width="800">
        <dev-doc-save
            :dev-doc="devDoc" :tag-ary="tagAry" :tag-set="tagSet"
            @save="mdfyDevDoc"
        />
    </v-dialog>
</template>

<script>
import DevDocSave from '@/components/dev-doc/DevDocSave.vue';
import { mdfyDevDoc } from '@/api/devDoc';
import { RSPNS } from '@/util/dfn';

export default {
    name: 'DevDocModal',
    components: {
        DevDocSave
    },
    props: {
        isModalOpen: {
            type: Boolean,
            default: () => false
        },
        devDoc: {
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
        async mdfyDevDoc(arg) {
            try {
                const { code } = await mdfyDevDoc(arg);

                if (code === RSPNS.SUCCES) {
                    this.$message({ type: 'success', message: '수정 성공' });
                    this.$emit('close');
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
