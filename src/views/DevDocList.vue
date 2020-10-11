<template>
    <v-card>
        <v-card-title>개발 관련 링크</v-card-title>

        <v-container>
            <!-- 검색 영역 -->
            <v-row>
                <v-col offset-lg="2" lg="2" cols="4">
                    <v-select
                        v-model="srchTy" :items="srchTyList" label="검색 타입"
                        required
                    />
                </v-col>
                <v-col lg="5">
                    <v-text-field
                        v-model="srchWord" label="검색어" required
                        :clearable="true" :disabled="isSrching" @keypress.enter="srchDevDoc(true)"
                    />
                </v-col>
                <v-col lg="1" cols="3">
                    <v-btn
                        color="primary" class="mt-3" block
                        :disabled="isSrching" @click="srchDevDoc(true)"
                    >
                        <v-icon>search</v-icon>
                    </v-btn>
                </v-col>
            </v-row>

            <!-- 검색 결과 영역 -->
            <v-data-table
                :headers="headers" :items="devDocList" :disable-sort="true"
                :loading="isSrching" loading-text="검색 중" hide-default-footer
                :mobile-breakpoint="0"
            >
                <template v-slot:[`item.title`]="{ item }">
                    <a :href="item.url">{{ item.title }}</a>
                </template>
                <template v-slot:[`item.copy`]="{ item }">
                    <v-btn color="grey darken-1" :x-small="isPhone" @click="copyLink(item.url)">
                        <v-icon :small="isPhone">
                            link
                        </v-icon>
                    </v-btn>
                </template>
                <template v-slot:[`item.mdfy`]="{ item }">
                    <v-btn color="success" :x-small="isPhone" @click="openModal(item.idx)">
                        <v-icon :small="isPhone">
                            create
                        </v-icon>
                    </v-btn>
                </template>
                <template v-slot:[`item.rm`]="{ item }">
                    <v-btn color="error" :x-small="isPhone" @click="rmDevDoc(item.idx)">
                        <v-icon :small="isPhone">
                            delete
                        </v-icon>
                    </v-btn>
                </template>
            </v-data-table>

            <v-pagination v-model="page" :length="totPageCnt" @input="srch(false)" />
        </v-container>

        <dev-doc-modal
            :is-modal-open="isModalOpen" :dev-doc="devDoc" :tag-ary="tagAry"
            :tag-set="tagSet" @close="isModalOpen = false"
        />
    </v-card>
</template>

<script>
import DevDocModal from '@/components/dev-doc/DevDocModal.vue';
import { RSPNS } from '@/util/dfn';
import { getDevDocList, rmDevDoc, getDevDoc } from '@/api/devDoc';

export default {
    name: 'DevDoc',
    components: {
        DevDocModal
    },
    data() {
        return {
            srchTy: 1,
            srchTyList: [
                { text: '태그', value: 1 },
                { text: '제목', value: 2 }
            ],
            srchWord: '',
            page: 1,
            isSrching: false,
            headers: [
                { text: '링크', value: 'title', align: 'center' },
                { text: '복사', value: 'copy', align: 'center' },
                { text: '수정', value: 'mdfy', align: 'center' },
                { text: '삭제', value: 'rm', align: 'center' }
            ],
            devDocList: [],
            totCnt: 0,
            isModalOpen: false,
            devDoc: {},
            tagAry: [],
            tagSet: null
        };
    },
    computed: {
        totPageCnt() {
            return Math.ceil(this.totCnt / 10);
        },
        isPhone() {
            return this.$store.getters.isPhone;
        }
    },
    methods: {
        chckParam() {
            if (this.srchWord) {
                // 제목 검색인 경우 3글자부터 검색 가능
                if (this.srchTy === 2) {
                    if (this.srchWord.length > 2) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return true;
                }
            } else {
                return false;
            }
        },
        /**
         * @description 개발 문서 검색
         */
        async srchDevDoc(isSrch) {
            try {
                const isValidParam = this.chckParam();

                if (isValidParam) {
                    this.isSrching = true;

                    if (isSrch) {
                        this.page = 1;
                    }

                    const { code, totCnt, devDocList } = await getDevDocList({
                        ty: this.srchTy,
                        page: this.page,
                        srchWord: this.srchWord
                    });

                    if (code === RSPNS.SUCCES) {
                        this.totCnt = totCnt;
                        this.devDocList = devDocList;
                    } else {
                        throw new Error(code);
                    }
                } else {
                    this.$message({ type: 'warning', message: '입력 값을 확인해주세요.' });
                }
            } catch (err) {
                console.error(err);
                this.$message({ type: 'error', message: '에러가 발생했습니다.' });
            } finally {
                this.isSrching = false;
            }
        },
        async rmDevDoc(idx) {
            try {
                await this.$confirm('정말로 삭제하시겠습니까?', '링크 삭제', {
                    confirmButtonText: '삭제',
                    type: 'warning'
                });

                const { code } = await rmDevDoc(idx);

                if (code === RSPNS.SUCCES) {
                    this.$message({ type: 'success', message: '삭제되었습니다.' });
                } else {
                    throw new Error(code);
                }
            } catch (err) {
                if (err !== 'cancel') {
                    console.error(err);
                    this.$message({ type: 'error', message: '에러가 발생했습니다.' });
                }
            }
        },
        async openModal(idx) {
            try {
                const { code, devDoc, tagAry } = await getDevDoc(idx);

                if (code === RSPNS.SUCCES) {
                    this.devDoc = devDoc;
                    this.tagAry = tagAry;
                    this.tagSet = new Set(tagAry);
                    this.isModalOpen = true;
                } else {
                    throw new Error(code);
                }
            } catch (err) {
                console.error(err);
                this.$message({ type: 'error', message: '에러가 발생했습니다.' });
            }
        },
        copyLink(url) {
            this.$clipboard(url);
        }
    }
};
</script>
