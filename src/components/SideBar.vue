<template>
    <v-list dense>
        <v-list-item link href="/dev-link/list">
            <v-list-item-action>
                <v-icon>link</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>개발 링크 검색</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item link href="/dev-link/add">
            <v-list-item-action>
                <v-icon>library_add</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>개발 링크 등록</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script>
export default {
    name: 'SideBar'
};
</script>
