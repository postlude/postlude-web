<template>
    <v-container>
        <v-row>
            <v-col
                offset="1" cols="10" offset-lg="3"
                lg="6"
            >
                <v-form>
                    <!-- 메인 명령어 입력 영역 -->
                    <v-text-field
                        v-model="mainCmd.cmd"
                        :counter="20"
                        label="메인 명령어"
                    />
                    <v-textarea
                        v-model="mainCmd.dc"
                        :counter="500"
                        label="설명"
                    />
                    <v-text-field
                        v-model="mainCmd.frmt"
                        :counter="50"
                        label="형식"
                    />
                    <v-textarea
                        v-model="mainCmd.ex"
                        :counter="500"
                        label="예시"
                    />

                    <!-- 서브 명령어 입력 영역 -->
                    <v-expansion-panels>
                        <v-expansion-panel v-for="(sub, i) in subCmd" :key="i">
                            <v-expansion-panel-header>
                                {{ sub.cmd || `서브 명령어 ${i + 1}` }}
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-text-field
                                    v-model="sub.cmd"
                                    :counter="20"
                                    label="서브 명령어"
                                />
                                <v-textarea
                                    v-model="sub.dc"
                                    :counter="500"
                                    label="설명"
                                />
                                <v-text-field
                                    v-model="sub.frmt"
                                    :counter="50"
                                    label="형식"
                                />
                                <v-textarea
                                    v-model="sub.ex"
                                    :counter="500"
                                    label="예시"
                                />
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-form>

                <!-- 버튼 영역 -->
                <div class="d-flex justify-end">
                    <v-btn
                        large color="error" class="ma-2"
                        @click="reset"
                    >
                        초기화
                    </v-btn>
                    <v-btn
                        large color="success" class="ma-2"
                        @click="addSub"
                    >
                        서브 명령어 추가
                    </v-btn>
                    <v-btn
                        large color="primary" class="ma-2"
                        :loading="loading" @click="regist"
                    >
                        등록
                    </v-btn>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { saveMainCmd } from '@/api/main-cmd';

export default {
    name: 'CmdSave',
    data() {
        return {
            loading: false,
            mainCmd: {
                cmd: null,
                dc: null,
                frmt: null,
                ex: null
            },
            subCmd: []
        };
    },
    methods: {
        /**
         * @description 모든 입력 값 초기화
         */
        reset() {
            this.mainCmd = {};
            this.subCmd = [];
            this.$message({ message: '모든 입력 값을 초기화했습니다.', type: 'error' });
        },
        /**
         * @description 입력 값 체크
         */
        isValidInput() {
            if (this.mainCmd.cmd) {
                const isValidSub = this.subCmd.every(sub => sub.cmd);
                if (isValidSub) {
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
        regist() {
            if (this.isValidInput()) {
                this.$root.cnfrm({
                    title: '명령어 등록',
                    mssage: '등록하시겠습니까?',
                    excMssage: '등록되었습니다.',
                    cnfrmFunc: async () => {
                        this.loading = true;
                        await saveMainCmd({
                            mainCmd: this.mainCmd,
                            subCmd: this.subCmd
                        });
                        this.mainCmd = {};
                    },
                    fnlyFunc: () => {
                        this.loading = false;
                    }
                });
            } else {
                this.$message({ message: '입력 값을 확인해주세요.', type: 'warning' });
            }
        },
        /**
         * @description 서브 명령어 추가
         */
        addSub() {
            this.subCmd.push({});
        }
    }
};
</script>
