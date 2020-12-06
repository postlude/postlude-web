<template>
    <v-card>
        <v-card-title>개발 링크 검색</v-card-title>

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
                    <v-autocomplete
                        v-show="srchTy === 1" v-model="srchTagAry" label="태그"
                        multiple no-data-text="" :clearable="true"
                        :items="tagList" :disabled="isSrching"
                    />
                    <v-text-field
                        v-show="srchTy === 2" v-model="srchTitle" label="제목"
                        required :clearable="true" :disabled="isSrching"
                        @keypress.enter="srchDevLink(true)"
                    />
                </v-col>
                <v-col lg="1" cols="3">
                    <v-btn
                        color="primary" class="mt-3" block
                        :disabled="isSrching" @click="srchDevLink(true)"
                    >
                        <v-icon>search</v-icon>
                    </v-btn>
                </v-col>
            </v-row>

            <!-- 검색 결과 영역 -->
            <v-data-table
                :headers="headers" :items="devLinkList" :disable-sort="true"
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
                    <v-btn color="error" :x-small="isPhone" @click="rmDevLink(item.idx)">
                        <v-icon :small="isPhone">
                            delete
                        </v-icon>
                    </v-btn>
                </template>
            </v-data-table>

            <v-pagination v-model="page" :length="totPageCnt" @input="srch(false)" />
        </v-container>

        <dev-link-modal
            :is-modal-open="isModalOpen" :dev-link="devLink" :tag-ary="tagAry"
            :tag-set="tagSet" @close="isModalOpen = false"
        />
    </v-card>
</template>

<script>
import DevLinkModal from '@/components/dev-link/DevLinkModal.vue';
import { RSPNS, TAG_TY } from '@/util/dfn';
import { getDevLinkList, rmDevLink, getDevLink } from '@/api/devLink';
import { getTagList } from '@/api/tag';

export default {
    name: 'DevLinkList',
    components: {
        DevLinkModal
    },
    data() {
        return {
            srchTy: 1,
            srchTyList: [
                { text: '태그', value: 1 },
                { text: '제목', value: 2 }
            ],
            srchTagAry: [],
            srchTitle: '',
            page: 1,
            isSrching: false,
            headers: [
                { text: '링크', value: 'title', align: 'center' },
                { text: '복사', value: 'copy', align: 'center' },
                { text: '수정', value: 'mdfy', align: 'center' },
                { text: '삭제', value: 'rm', align: 'center' }
            ],
            devLinkList: [],
            totCnt: 0,
            isModalOpen: false,
            devLink: {},
            tagAry: [],
            tagSet: null,
            tagList: []
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
    async mounted() {
        try {
            const { code, tagList } = await getTagList(TAG_TY.DEV_LINK);
            if (code === RSPNS.SUCCES) {
                this.tagList = tagList.map(({ tag }) => tag);
            } else {
                throw new Error(code);
            }
        } catch (err) {
            console.error(err);
        }
    },
    methods: {
        chckParam() {
            if (this.srchTy === 1) { // 태그 검색
                if (this.srchTagAry.length) {
                    return true;
                } else {
                    return false;
                }
            } else if (this.srchTitle.length > 2) { // 제목 검색
                return true;
            } else {
                return false;
            }
        },
        /**
         * @description 개발 문서 검색
         */
        async srchDevLink(isSrch) {
            try {
                const isValidParam = this.chckParam();

                if (isValidParam) {
                    this.isSrching = true;

                    if (isSrch) {
                        this.page = 1;
                    }

                    const { code, totCnt, devLinkList } = await getDevLinkList({
                        ty: this.srchTy,
                        page: this.page,
                        srchTitle: this.srchTitle,
                        srchTagAry: JSON.stringify(this.srchTagAry)
                    });

                    if (code === RSPNS.SUCCES) {
                        this.totCnt = totCnt;
                        this.devLinkList = devLinkList;
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
        async rmDevLink(idx) {
            try {
                await this.$confirm('정말로 삭제하시겠습니까?', '링크 삭제', {
                    confirmButtonText: '삭제',
                    type: 'warning'
                });

                const { code } = await rmDevLink(idx);

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
                const { code, devLink, tagAry } = await getDevLink(idx);

                if (code === RSPNS.SUCCES) {
                    this.devLink = devLink;
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
