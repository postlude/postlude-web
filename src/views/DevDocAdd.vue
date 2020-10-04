<template>
    <v-card>
        <v-card-title>개발 관련 링크</v-card-title>

        <v-container>
            <v-row>
                <v-col offset-lg="3" lg="6">
                    <v-form>
                        <v-text-field v-model="devDoc.title" :counter="100" label="제목" />
                        <v-textarea
                            v-model="devDoc.url" :counter="500" :rows="3"
                            label="링크 주소"
                        />
                        <v-text-field v-model="tag" label="태그" @keypress.enter="addTag" />
                        <v-chip
                            v-for="(t, i) in tagAry" :key="t" close
                            color="teal" class="ma-1" @click:close="rmTag(t, i)"
                        >
                            {{ t }}
                        </v-chip>
                    </v-form>
                </v-col>
            </v-row>
            <v-row>
                <v-col offset-lg="5" lg="2">
                    <v-btn color="primary" block @click="addDevDoc">
                        <v-icon>create</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
import { addDevDoc } from '@/api/devDoc';
import { RSPNS } from '@/util/dfn';

export default {
    name: 'DevDocAdd',
    data() {
        return {
            devDoc: {},
            tag: '',
            tagSet: new Set(),
            tagAry: []
        };
    },
    methods: {
        addTag() {
            if (this.tag) {
                if (!this.tagSet.has(this.tag)) {
                    this.tagSet.add(this.tag);
                    this.tagAry.push(this.tag);
                }
                this.tag = '';
            }
        },
        rmTag(tag, idx) {
            this.tagSet.delete(tag);
            this.tagAry.splice(idx, 1);
        },
        chckParam() {
            const { title, url } = this.devDoc;
            if (title && url && this.tagAry.length) {
                return true;
            } else {
                return false;
            }
        },
        async addDevDoc() {
            try {
                const isValid = this.chckParam();
                if (isValid) {
                    const { code } = await addDevDoc({
                        devDoc: this.devDoc,
                        tagAry: this.tagAry
                    });

                    if (code === RSPNS.SUCCES) {
                        this.$message({ type: 'success', message: '등록 성공' });

                        this.devDoc = {};
                        this.tag = '';
                        this.tagSet = new Set();
                        this.tagAry = [];
                    } else {
                        throw code;
                    }
                } else {
                    this.$message({ type: 'warning', message: '입력 값을 확인해주세요.' });
                }
            } catch (err) {
                console.error(err);
                this.$message({ type: 'error', message: '에러가 발생했습니다.' });
            }
        }
    }
};
</script>
