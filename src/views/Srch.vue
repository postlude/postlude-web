<template>
    <v-card>
        <v-card-title>검색</v-card-title>

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
                        v-model="input" label="검색어" required
                        :disabled="isSrching" @keypress.enter="srch(true)"
                    />
                </v-col>
                <v-col lg="1">
                    <v-btn
                        color="primary" class="mt-3" block
                        :disabled="isSrching" @click="srch(true)"
                    >
                        <v-icon>search</v-icon>
                    </v-btn>
                </v-col>
            </v-row>

            <!-- 검색 결과 영역 -->
            <v-data-table
                :headers="headers" :items="srchRslt" :disable-sort="true"
                :loading="isSrching" loading-text="검색 중" hide-default-footer
            >
                <template v-slot:[`item.rgstDt`]="{ item }">
                    <span>{{ dtFrmtr(item.rgstDt) }}</span>
                </template>
                <template v-slot:[`item.updtDt`]="{ item }">
                    <span>{{ dtFrmtr(item.updtDt) }}</span>
                </template>
            </v-data-table>

            <v-pagination v-model="page" :length="totPageCnt" @input="srch(false)" />
        </v-container>
    </v-card>
</template>

<script>
import { RSPNS } from '@/util/define';
import { getMainCmdList } from '@/api/mainCmd';
import { toKstDt } from '@/util/moment';

export default {
    name: 'Srch',
    components: {
        // CmdSearch
    },
    data() {
        return {
            srchTy: 1,
            srchTyList: [
                { text: '명령어', value: 1 },
                { text: '실행문', value: 2 }
            ],
            page: 1,
            input: '',
            totCnt: 0,
            isSrching: false,
            srchRslt: []
        };
    },
    computed: {
        headers() {
            if (this.srchTy === 1) {
                return [
                    { text: '인덱스', value: 'idx', align: 'center' },
                    { text: '명령어', value: 'cmd', align: 'center' },
                    { text: '최초 등록일', value: 'rgstDt', align: 'center' },
                    { text: '최종 수정일', value: 'updtDt', align: 'center' }
                ];
            } else {
                return [
                    { text: 'Calories', value: 'calories' }
                ];
            }
        },
        totPageCnt() {
            return Math.ceil(this.totCnt / 10);
        }
    },
    methods: {
        /**
         * @description 검색 타입에 따라 검색
         */
        async srch(isSrch) {
            if (this.input) {
                if (isSrch) {
                    this.page = 1;
                }

                this.isSrching = true;
                if (this.srchTy === 1) {
                    await this.srchCmd();
                } else {
                    // search statement
                }
                this.isSrching = false;
            } else {
                this.$message({ type: 'warning', message: '검색어를 입력해주세요.' });
            }
        },
        /**
         * @description 명령어 검색
         */
        async srchCmd() {
            try {
                const { code, totCnt, mainCmdList } = await getMainCmdList({
                    page: this.page,
                    mainCmd: this.input
                });

                if (code === RSPNS.SUCCES) {
                    this.totCnt = totCnt;

                    if (totCnt) {
                        this.srchRslt = mainCmdList;
                    } else {
                        this.$message({ type: 'warning', message: '검색 결과가 없습니다.' });
                    }
                } else {
                    throw new Error(`[Srch] srchCmd - ${code}`);
                }
            } catch (err) {
                console.error(err);
                this.$message({ type: 'error', message: '에러가 발생했습니다.' });
            }
        },
        /**
         * @description UTC 날짜를 KST로 변환
         * @param {string} dt
         * @returns {string}
         */
        dtFrmtr(dt) {
            return toKstDt(dt);
        }
    }
};
</script>
