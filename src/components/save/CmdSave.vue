<template>
    <v-container>
        <v-row>
            <v-col
                offset="1" cols="10" offset-lg="3"
                lg="6"
            >
                <v-form>
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
                </v-form>

                <div class="d-flex justify-end">
                    <v-btn
                        large color="error" class="ma-2"
                        @click="reset"
                    >
                        초기화
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
            }
        };
    },
    methods: {
        reset() {
            this.mainCmd = {};
            this.$message({ message: '입력 값을 초기화했습니다.', type: 'error' });
        },
        regist() {
            this.$root.cnfrm({
                title: '메인 명령어 등록',
                mssage: '등록하시겠습니까?',
                excMssage: '등록되었습니다.',
                cnfrmFunc: async () => {
                    this.loading = true;
                    await saveMainCmd(this.mainCmd);
                    this.mainCmd = {};
                },
                fnlyFunc: () => {
                    this.loading = false;
                }
            });
        }
    }
};
</script>
