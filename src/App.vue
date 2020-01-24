<template>
    <v-app id="inspire">
        <!-- Header -->
        <v-app-bar app clipped-left>
            <v-app-bar-nav-icon @click.stop="openSideBar = !openSideBar" />
            <v-toolbar-title>My Cmd</v-toolbar-title>
        </v-app-bar>

        <!-- SideBar -->
        <v-navigation-drawer v-model="openSideBar" app clipped>
            <side-bar />
        </v-navigation-drawer>

        <!-- Content -->
        <v-content>
            <v-container class="fill-height" fluid>
                <!-- <v-row align="center" justify="center">
                    <v-col class="shrink">
                        <v-tooltip right>
                            <template v-slot:activator="{ on }">
                                <v-btn
                                    icon
                                    large
                                    target="_blank"
                                    v-on="on"
                                >
                                    <v-icon large>
                                        mdi-code-tags
                                    </v-icon>
                                </v-btn>
                            </template>
                            <span>Source</span>
                        </v-tooltip>

                        <v-tooltip right>
                            <template v-slot:activator="{ on }">
                                <v-btn
                                    icon
                                    large
                                    href="https://codepen.io/johnjleider/pen/bXNzZL"
                                    target="_blank"
                                    v-on="on"
                                >
                                    <v-icon large>
                                        mdi-codepen
                                    </v-icon>
                                </v-btn>
                            </template>
                            <span>Codepen</span>
                        </v-tooltip>

                        <v-btn
                            large
                            @click="isOpen = true"
                        >
                            alert
                        </v-btn>
                    </v-col>
                </v-row> -->
                <router-view />
            </v-container>
        </v-content>

        <!-- Footer -->
        <v-footer app padless>
            <v-col class="text-right" cols="12">
                <v-icon>email</v-icon>
                seungdeokhan@naver.com
            </v-col>
        </v-footer>
    </v-app>
</template>

<script>
import SideBar from '@/components/SideBar.vue';

export default {
    components: {
        SideBar
    },
    data: () => ({
        openSideBar: false
    }),
    created() {
        this.$vuetify.theme.dark = true;
    },
    methods: {
        close() {
            this.isOpen = false;
        }
    }
};
</script>
