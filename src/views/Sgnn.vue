<template>
    <v-card class="mx-auto my-12" max-width="344">
        <v-card-title>Sign In</v-card-title>

        <v-card-text>
            <v-form ref="form" v-model="isValid">
                <v-text-field
                    v-model="user.email" :rules="emailRule" label="email"
                    required disabled
                />

                <v-text-field
                    v-model="user.pw" :rules="pwRule" type="password"
                    label="password" required :clearable="true"
                    @keypress.enter="sgnn"
                />

                <v-btn color="info" block @click="sgnn">
                    로그인
                </v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
import { RSPNS } from '@/util/dfn';
import { sgnn } from '@/api/user';
import { setTkn } from '@/api/cmn';
import { setCookie } from '@/util/cookie';

export default {
    name: 'Sgnn',
    data() {
        return {
            isValid: false,
            emailRule: [
                v => !!v || '이메일을 입력해주세요.',
                v => /.+@.+\..+/.test(v) || '유효한 이메일 형식이 아닙니다.'
            ],
            pwRule: [v => !!v || '패스워드를 입력해주세요.'],
            user: {
                email: 'seungdeokhan@naver.com',
                pw: null
            }
        };
    },
    methods: {
        async sgnn() {
            try {
                this.$refs.form.validate();

                if (this.isValid) {
                    const { code, tkn } = await sgnn(this.user);

                    switch (code) {
                        case RSPNS.SUCCES: {
                            setCookie('tkn', tkn, { expires: 1 });
                            setTkn(tkn);
                            this.$store.commit('setSgnnSttus', true);

                            if (this.$route.name !== 'Profile') {
                                this.$router.replace({ name: 'Profile' });
                            }
                            break;
                        }
                        case RSPNS.FAIL_INVLD_PW: {
                            this.$message({ type: 'warning', message: '패스워드를 확인해주세요.' });
                            break;
                        }
                        default: {
                            throw new Error(code);
                        }
                    }
                }
            } catch (err) {
                console.error(err);
                this.$message({ type: 'error', message: '에러가 발생했습니다.' });
            }
        }
    }
};
</script>
