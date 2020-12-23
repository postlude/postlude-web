<template>
    <v-list dense>
        <v-list-item v-show="!isSgnn" link to="/sgnn">
            <v-list-item-action>
                <v-icon>account_box</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>로그인</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item v-show="isSgnn" @click="sgnt">
            <v-list-item-action>
                <v-icon>account_box</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>로그아웃</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/dev-link/list">
            <v-list-item-action>
                <v-icon>link</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>개발 링크 검색</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/dev-link/add">
            <v-list-item-action>
                <v-icon>library_add</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>개발 링크 등록</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/exec-stmt/list">
            <v-list-item-action>
                <v-icon>code</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>실행문 검색</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/exec-stmt/add">
            <v-list-item-action>
                <v-icon>library_add</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>실행문 등록</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script>
import { clearTkn } from '@/api/cmn';
import { rmCookie } from '@/util/cookie';

export default {
    name: 'SideBar',
    computed: {
        isSgnn() {
            return this.$store.getters.isSgnn;
        }
    },
    methods: {
        sgnt() {
            rmCookie('tkn');
            clearTkn();
            this.$store.commit('setSgnnSttus', false);

            if (this.$route.name !== 'Profile') {
                this.$router.replace({ name: 'Profile' });
            }
        }
    }
};
</script>
