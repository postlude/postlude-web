<template>
    <v-container>
        <v-row>
            <v-col
                offset="1" cols="10" offset-lg="3"
                lg="6"
            >
                <v-form>
                    <!-- 메인 명령어 입력 영역 -->
                    <v-text-field v-model="mainCmd.cmd" :counter="20" label="메인 명령어" />
                    <v-textarea v-model="mainCmd.dc" :counter="500" label="설명" />
                    <v-text-field v-model="mainCmd.frmt" :counter="50" label="형식" />
                    <v-textarea v-model="mainCmd.ex" :counter="500" label="예시" />

                    <!-- 옵션 입력 영역 -->
                    <v-expansion-panels>
                        <v-expansion-panel v-for="(optn, i) in optnList" :key="i">
                            <v-expansion-panel-header>
                                {{ optn.cmdOptn || `옵션 ${i + 1}` }}
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-text-field v-model="optn.cmdOptn" :counter="20" label="옵션" />
                                <v-textarea v-model="optn.dc" :counter="500" label="설명" />
                                <v-text-field v-model="optn.frmt" :counter="50" label="형식" />
                                <v-textarea v-model="optn.ex" :counter="500" label="예시" />
                                <div class="d-flex justify-end">
                                    <v-btn icon color="error" @click="rmOptn(i)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </div>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-form>

                <!-- 버튼 영역 -->
                <div class="d-flex justify-space-between">
                    <v-btn color="error" class="ma-2" @click="reset">
                        <v-icon>mdi-backup-restore</v-icon>
                    </v-btn>
                    <v-btn color="success" class="ma-2" @click="addOptn">
                        <v-icon>mdi-plus-box</v-icon>
                    </v-btn>
                    <v-btn
                        color="primary" class="ma-2" :loading="loading"
                        @click="rgst"
                    >
                        <v-icon>mdi-pencil-box</v-icon>
                    </v-btn>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { RSPNS } from '@/util/define';
import { saveMainCmd } from '@/api/mainCmd';

export default {
    name: 'MainCmdSave',
    data() {
        return {
            loading: false,
            mainCmd: {
                cmd: null,
                dc: null,
                frmt: null,
                ex: null
            },
            optnList: []
        };
    },
    methods: {
        /**
         * @description 모든 입력 값 초기화
         */
        reset() {
            this.mainCmd = {};
            this.optnList = [];
        },
        /**
         * @description 입력 값 체크
         */
        isValidInpt() {
            if (this.mainCmd.cmd) {
                const isValidOptn = this.optnList.every(optn => optn.cmdOptn);
                if (isValidOptn) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },
        /**
         * @description 명령어 등록
         */
        async rgst() {
            try {
                if (this.isValidInpt()) {
                    await this.$confirm('등록하시겠습니까?', '메인 명령어 등록', { type: 'warning' });

                    const { code } = await saveMainCmd({
                        mainCmd: this.mainCmd,
                        optnList: this.optnList
                    });

                    if (code === RSPNS.SUCCES) {
                        this.$message({ message: '등록되었습니다.', type: 'success' });
                        this.reset();
                    } else {
                        throw new Error('[MainCmdSave] rgst - ERROR');
                    }
                } else {
                    this.$message({ message: '입력 값을 확인해주세요.', type: 'warning' });
                }
            } catch (err) {
                if (err !== 'cancel') {
                    console.error(err);
                    this.$message({ type: 'error', message: '에러가 발생했습니다.' });
                }
            }
        },
        /**
         * @description 옵션 추가
         */
        addOptn() {
            this.optnList.push({});
        },
        /**
         * @description 옵션 제거
         */
        rmOptn(idx) {
            this.optnList.splice(idx, 1);
        }
    }
};
</script>
