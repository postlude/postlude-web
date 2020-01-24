<template>
    <v-list dense>
        <v-list-item link href="about">
            <v-list-item-action>
                <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item link>
            <v-list-item-action>
                <v-icon>mdi-settings</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>Settings</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script>
export default {
    name: 'SideBar'
};
</script>
