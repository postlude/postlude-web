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
                        <v-expansion-panel v-for="(sub, i) in subCmdList" :key="i">
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
                                <div class="d-flex justify-end">
                                    <v-btn icon color="error" @click="rmSubCmd(i)">
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
                    <v-btn color="success" class="ma-2" @click="addSub">
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
import { saveCmd } from '@/api/cmd';

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
            subCmdList: []
        };
    },
    methods: {
        /**
         * @description 모든 입력 값 초기화
         */
        reset() {
            this.mainCmd = {};
            this.subCmdList = [];
        },
        /**
         * @description 입력 값 체크
         */
        isValidInpt() {
            if (this.mainCmd.cmd) {
                const isValidSub = this.subCmdList.every(sub => sub.cmd);
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
        async rgst() {
            try {
                if (this.isValidInpt()) {
                    await this.$confirm('등록하시겠습니까?', '명령어 등록', { type: 'warning' });

                    const { code } = await saveCmd({
                        mainCmd: this.mainCmd,
                        subCmdList: this.subCmdList
                    });

                    if (code === RSPNS.SUCCES) {
                        this.$message({ message: '등록되었습니다.', type: 'success' });
                        this.reset();
                    } else {
                        throw new Error('[CmdSave] rgst - ERROR');
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
         * @description 서브 명령어 추가
         */
        addSub() {
            this.subCmdList.push({});
        },
        /**
         * @description 서브 명령어 제거
         */
        rmSubCmd(idx) {
            this.subCmdList.splice(idx, 1);
        }
    }
};
</script>
