<template>
    <v-card>
        <v-card-title>실행문 저장</v-card-title>

        <v-container>
            <v-row>
                <v-col offset-lg="3" lg="6">
                    <v-form>
                        <v-text-field
                            v-model="execStmt.title" :counter="200" :clearable="true"
                            label="제목"
                        />
                        <v-text-field
                            v-model="execStmt.dc" :counter="500" :rows="3"
                            :clearable="true" label="설명"
                        />
                        <v-textarea
                            v-model="execStmt.stmt" :counter="1000" :rows="3"
                            :clearable="true" label="실행문"
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
                    <v-btn color="primary" block @click="saveExecStmt">
                        <v-icon>create</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row v-if="ty === 1">
                <v-col offset-lg="5" lg="2">
                    <v-btn color="error" block @click="resetInpt">
                        <v-icon>remove_circle</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row v-if="ty === 2">
                <v-col offset-lg="5" lg="2">
                    <v-btn color="default" block @click="$emit('close')">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
export default {
    name: 'ExecStmtSave',
    props: {
        ty: {
            type: Number,
            default: () => 1
        },
        execStmt: {
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
            const { title, stmt } = this.execStmt;
            if (title && stmt && this.tagAry.length) {
                return true;
            } else {
                return false;
            }
        },
        saveExecStmt() {
            const isValid = this.chckParam();
            if (isValid) {
                this.$emit('save', {
                    execStmt: this.execStmt,
                    tagAry: this.tagAry
                });
            } else {
                this.$message({ type: 'warning', message: '입력 값을 확인해주세요.' });
            }
        },
        resetInpt() {
            this.execStmt.idx = 0;
            this.execStmt.title = '';
            this.execStmt.stmt = '';
            this.execStmt.dc = '';
            this.tagAry.splice(0);
            this.tagSet.clear();
        }
    }
};
</script>
