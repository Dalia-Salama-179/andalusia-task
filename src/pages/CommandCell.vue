<template>

    <td v-if="dataItem['inEdit']">
        <button class="k-button k-grid-cancel-command" @click="cancelDiscardHandler">
            <svg>
                <use xlink:href="@/assets/images/sprite.svg#cancel"></use>
            </svg>
        </button>
        <button class="k-button k-grid-save-command" @click="addUpdateHandler">
            <svg>
                <use xlink:href="@/assets/images/sprite.svg#save"></use>
            </svg>
        </button>
    </td>
    <td v-else>
        fvd
    </td>
</template>
<script>
    export default {
        name: 'CommandCell',
        props: {
            field: String,
            dataItem: Object,
            format: String,
            className: String,
            columnIndex: Number,
            columnsCount: Number,
            rowType: String,
            level: Number,
            expanded: Boolean,
            editor: String
        },
        methods: {
            editHandler: function () {
                this.$emit('edit', {dataItem: this.dataItem});
            },
            removeHandler: function () {
                this.$emit('remove', {dataItem: this.dataItem});
            },
            addUpdateHandler: function () {
                this.$emit('save', {dataItem: this.dataItem});
            },
            cancelDiscardHandler: function () {
                this.$emit('cancel', {dataItem: this.dataItem});
            }
        }
    }
</script>
<style scoped>
    svg {
        width: 20px;
        height: 20px;
    }
</style>