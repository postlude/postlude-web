<template>
    <v-list dense>
        <!-- <v-list-item link href="about">
            <v-list-item-action>
                <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item-content>
        </v-list-item> -->

        <v-list-item link href="/dev-doc/list">
            <v-list-item-action>
                <v-icon>link</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>개발 링크 검색</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item link href="/dev-doc/add">
            <v-list-item-action>
                <v-icon>library_add</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>개발 링크 등록</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <!-- <v-list-item link href="srch">
            <v-list-item-action>
                <v-icon>search</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>검색</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item link href="save">
            <v-list-item-action>
                <v-icon>save</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>등록</v-list-item-title>
            </v-list-item-content>
        </v-list-item> -->
    </v-list>
</template>

<script>
export default {
    name: 'SideBar'
};
</script>
