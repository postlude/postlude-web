<template>
    <v-row justify="center">
        <v-dialog
            v-model="isOpen" persistent :light="true"
            :width="width"
        >
            <v-card>
                <v-card-title class="headline">
                    {{ title }}
                </v-card-title>

                <v-card-text>
                    <v-icon v-if="ty === 1 || ty === 4" large color="warning">
                        warning
                    </v-icon>
                    <v-icon v-if="ty === 2" large color="error">
                        error
                    </v-icon>
                    {{ text }}
                </v-card-text>

                <v-card-actions>
                    <v-spacer />
                    <v-btn v-if="ty === 3 || ty === 4" color="error" @click="$emit('close')">
                        {{ cancelBtnText }}
                    </v-btn>

                    <v-btn color="primary" @click="$emit('cnfirm')">
                        {{ cnfirmBtnText }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    name: 'Modal',
    props: {
        isOpen: {
            type: Boolean,
            default: false,
            required: true
        },
        /**
         * @description modal type
         * 0 : info alert
         * 1 : warning alert
         * 2 : error alert
         * 3 : info confirm
         * 4 : warning confirm
         */
        ty: {
            type: Number,
            default: null,
            required: true,
            validator: value => (value >= 0 && value <= 4)
        },
        width: {
            type: Number,
            default: 400
        },
        title: {
            type: String,
            default: ''
        },
        iconTy: {
            type: Number,
            default: null
        },
        text: {
            type: String,
            default: ''
        },
        cnfirmBtnText: {
            type: String,
            default: '확인'
        },
        cancelBtnText: {
            type: String,
            default: '취소'
        }
    }
};
</script>
