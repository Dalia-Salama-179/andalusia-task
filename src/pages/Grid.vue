<template>
    <Grid ref="grid"
          :filterable="true"
          :filter="filter"
          @filterchange="filterChange"
          :data-items="getData"
          :edit-field="'inEdit'"
          @itemchange="itemChange"
          :columns="columns">
        <template v-slot:myDropDownCell="{props}">
            <ddcell :data-item="props.dataItem"
                    :field="props.field"
                    @change="(e) => ddChange(e, props.dataItem)"/>
        </template>
        <template v-slot:myTemplate="{props}">
            <custom :data-item="props.dataItem"
                    @save="save"
                    @cancel="cancel"/>
        </template>
        <grid-toolbar>
            <div>
                <button title="Add new" class="k-button primary-btn new-product-btn"
                        :class="{'pointer-events-none': editID}"
                        :disabled="editID? true: false"
                        @click.prevent='addRecord' >
                    <svg>
                        <use xlink:href="@/assets/images/sprite.svg#add"></use>
                    </svg>
                    New Product
                </button>
            </div>
        </grid-toolbar>
    </Grid>
</template>
<script>
    import { Grid, GridToolbar } from '@progress/kendo-vue-grid';
    import { filterBy } from '@progress/kendo-data-query';
    import CommandCell from './CommandCell';
    import DropDownCell from './DropDownCell';

    export default {
        components: {
            'Grid': Grid,
            'grid-toolbar': GridToolbar,
            'custom': CommandCell,
            'ddcell': DropDownCell,

        },
        data: function () {
            return {
                filter: {
                    logic: "and",
                    filters: [
                        // { field: "UnitPrice", operator: "neq", value: 18 },
                        // { field: "FirstOrderedOn", operator: "gte", value:new Date("1996-10-10") }
                    ]
                },
                updatedData: [],
                editID: null,
                group: [ { field: 'qty' } ],
                expandedItems: [],
                columns: [
                    { field: 'ProductName', title: 'Product' },
                    { field: 'qty', title: 'Total Required Quantity', editor: 'numeric' },
                    { field: 'uom', title: 'UOM', cell: 'myDropDownCell' },
                    { cell: 'myTemplate', title: 'Action', filterable: false }

                ],
                gridData: [{
                    "ProductID": 1,
                    "ProductName": "Chai",
                    "qty": 39,
                    "uom": 'Strip',
                },{
                    "ProductID": 2,
                    "ProductName": "Chang",
                    "qty": 17,
                    "uom": 'Box',
                },{
                    "ProductID": 3,
                    "ProductName": "Aniseed Syrup",
                    "qty": 13,
                    "uom": 'Strip',
                },{
                    "ProductID": 4,
                    "ProductName": "Chef Anton's Cajun Seasoning",
                    "qty": 53,
                    "uom": 'Strip',
                }]
            };
        },
        computed: {
            getData() {
                let x = this.gridData.map(
                    (item) => Object.assign({ inEdit: item.ProductID === this.editID}, item));
                return filterBy(x, this.filter);

            }
        },
        methods: {
            filterChange: function(ev) {
                this.filter = ev.filter;
            },
            itemChange: function (e) {
                    const data = this.gridData.slice();
                const index = data.findIndex(d => d.ProductID === e.dataItem.ProductID);
                data[index] = { ...data[index], [e.field]: e.value };
                this.gridData = data;
                if(event.dataItem){
                    event.dataItem[e.field] = e.value;
                }
            },
            addRecord() {
                const newRecord = { ProductID: this.gridData.length + 1 };
                const data = this.gridData.slice();
                data.unshift(newRecord);
                this.gridData = data;
                this.editID = newRecord.ProductID;
            },
            save() {
                alert('save')
            },
            cancel() {
                this.gridData.splice(0, 1);
                this.editID = null
            },
            ddChange: function(e, dataItem) {
                console.log(e)
                console.log(dataItem)
            },
        }
    };

</script>