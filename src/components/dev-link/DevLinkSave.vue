<template>
    <v-card>
        <v-card-title>개발 관련 링크 저장</v-card-title>

        <v-container>
            <v-row>
                <v-col offset-lg="3" lg="6">
                    <v-form>
                        <v-text-field
                            v-model="devLink.title" :counter="100" :clearable="true"
                            label="제목"
                        />
                        <v-textarea
                            v-model="devLink.url" :counter="500" :rows="3"
                            :clearable="true" label="링크 주소"
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
                    <v-btn color="primary" block @click="saveDevLink">
                        <v-icon>create</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
export default {
    name: 'DevLinkSave',
    props: {
        devLink: {
            type: Object,
            default: () => ({
                idx: 0,
                title: '',
                url: ''
            })
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
    data() {
        return {
            tag: ''
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
            const { title, url } = this.devLink;
            if (title && url && this.tagAry.length) {
                return true;
            } else {
                return false;
            }
        },
        saveDevLink() {
            const isValid = this.chckParam();
            if (isValid) {
                this.$emit('save', {
                    devLink: this.devLink,
                    tagAry: this.tagAry
                });
            } else {
                this.$message({ type: 'warning', message: '입력 값을 확인해주세요.' });
            }
        }
    }
};
</script>
