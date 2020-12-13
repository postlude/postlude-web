<template>
    <v-app id="inspire">
        <!-- Header -->
        <v-app-bar app clipped-left>
            <v-app-bar-nav-icon @click.stop="openSideBar = !openSideBar" />
            <v-toolbar-title class="title" @click="moveProfile">
                POSTLUDE
            </v-toolbar-title>
        </v-app-bar>

        <!-- SideBar -->
        <v-navigation-drawer v-model="openSideBar" app clipped>
            <side-bar />
        </v-navigation-drawer>

        <!-- Content -->
        <v-content>
            <v-container fluid>
                <router-view />
            </v-container>
        </v-content>

        <!-- Footer -->
        <!-- <v-footer app padless class="text-right">
            <p class="my-auto ml-auto">
                <v-icon>email</v-icon>
                seungdeokhan@naver.com
            </p>
        </v-footer> -->
    </v-app>
</template>

<script>
import SideBar from '@/components/SideBar.vue';
import { getCookie } from '@/util/cookie';

export default {
    components: {
        SideBar
    },
    data: () => ({
        openSideBar: false
    }),
    created() {
        this.$vuetify.theme.dark = true;
        const isSgnn = !!getCookie('tkn');
        this.$store.commit('setSgnnSttus', isSgnn);
    },
    methods: {
        close() {
            this.isOpen = false;
        },
        moveProfile() {
            this.$router.push({ name: 'Profile' });
        }
    }
};
</script>

<style lang="scss" scoped>
    .title {
        cursor: pointer
    }
</style>
