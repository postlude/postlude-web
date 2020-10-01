<template>
    <v-card>
        <v-card-title>개발 관련 링크</v-card-title>

        <v-container>
            <!-- 검색 영역 -->
            <v-row>
                <v-col offset-lg="2" lg="2">
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
                <v-col lg="1" class="d-none d-sm-flex">
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
                :hide-default-header="$store.getters.isPhone"
            >
                <template v-slot:[`item.title`]="{ item }">
                    <a :href="item.url">{{ item.title }}</a>
                </template>
            </v-data-table>

            <v-pagination v-model="page" :length="totPageCnt" @input="srch(false)" />
        </v-container>
    </v-card>
</template>

<script>
import { getDevDocList } from '@/api/devDoc';

export default {
    name: 'DevDoc',
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
                { text: '링크', value: 'title', align: 'center' }
            ],
            devDocList: [],
            totCnt: 0
        };
    },
    computed: {
        totPageCnt() {
            return Math.ceil(this.totCnt / 10);
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

                    const { totCnt, devDocList } = await getDevDocList({
                        ty: this.srchTy,
                        page: this.page,
                        srchWord: this.srchWord
                    });

                    this.totCnt = totCnt;
                    this.devDocList = devDocList;
                } else {
                    this.$message({ type: 'warning', message: '입력 값을 확인해주세요.' });
                }
            } catch (err) {
                console.error(err);
                this.$message({ type: 'error', message: '에러가 발생했습니다.' });
            } finally {
                this.isSrching = false;
            }
        }
    }
};
</script>
