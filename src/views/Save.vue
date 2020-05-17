<template>
    <v-card>
        <v-card-title>신규 등록</v-card-title>

        <v-tabs :centered="true" :grow="true">
            <v-tab>명령어</v-tab>
            <v-tab>실행문</v-tab>

            <v-tab-item>
                <cmd-save />
            </v-tab-item>
            <v-tab-item>
                2222
            </v-tab-item>
        </v-tabs>
    </v-card>
</template>

<script>
import CmdSave from '@/components/save/CmdSave.vue';

export default {
    name: 'Save',
    components: {
        CmdSave
    }
};
</script>
