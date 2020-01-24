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
                <v-row align="center" justify="center">
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
                </v-row>
                <!-- <router-view /> -->
            </v-container>
        </v-content>

        <modal
            :is-open="isOpen" :ty="ty" title="정말로 삭제하시겠습니까?"
            text="asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf"
            @close="close"
        />

        <!-- Footer -->
        <v-footer app>
            <span>&copy; 2019</span>
        </v-footer>
    </v-app>
</template>

<script>
import SideBar from '@/components/SideBar.vue';
import Modal from '@/components/Modal.vue';

export default {
    components: {
        SideBar,
        Modal
    },
    // props: {
    //     source: String
    // },
    data: () => ({
        openSideBar: false,
        isOpen: false,
        ty: 2
    }),
    created() {
        this.$vuetify.theme.dark = true;
    },
    methods: {
        close() {
            this.isOpen = false;
        },
        test() {
            this.$root.cnfirm({
                type: 'error',
                cnfirmMssage: 'aaaa?'
            });
        }
    }
};
</script>
