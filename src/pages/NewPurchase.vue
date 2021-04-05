<template>
    <div class="new-purchase">
        <!-- breadcrumb -->
        <breadcrumb>
            <li>
                <router-link to="/">Inventory</router-link>
            </li>
            <li>
                <router-link to="/">Inventory Operations</router-link>
            </li>
            <li>
                <router-link to="/">Purchase Requisition List</router-link>
            </li>
            <li><span>New Purchase Requisition</span></li>
        </breadcrumb>

        <!-- page title -->
        <h2 class="page-title">{{ $route.name }}</h2>

        <div class="page-content">
            <form>
                <div class="sub-data-title">
                    <svg>
                        <use xlink:href="@/assets/images/sprite.svg#info"></use>
                    </svg>
                    Basic Information
                </div>
                <div class="basic-info">
                    <!-- PR code -->
                    <div>
                        <label>Purchase Requisition Code</label>
                        <k-input disabled="disabled" placeholder="PR Code is automatically generated"></k-input>
                    </div>

                    <!-- warehouse -->
                    <div>
                        <label>Warehouse <span>*</span></label>
                        <dropdownlist
                                :data-items='warehouses'
                                :text-field="'name'"
                                :data-item-key="'id'"
                                :value="value"
                                @change="warehouseSelected"
                        >
                        </dropdownlist>

                        <!-- drafts -->
                        <div class="drafts" v-if="drafts.length > 0">
                            <p class="text-danger">This warehouse already has other drafts</p>
                            <div>
                                <a href="#" @click.prevent.stop="showDraft = !showDraft">
                                    <svg>
                                        <use xlink:href="@/assets/images/sprite.svg#exclamation-mark"></use>
                                    </svg>
                                </a>
                                <ul :class="{'d-block': showDraft}">
                                    <li v-for="(draft, index) in drafts" :key="index">{{ draft }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- preferred delivery date -->
                    <div>
                        <label>preferred Delivery Date <span>*</span></label>
                        <datepicker
                                :min="new Date()"
                                :default-value="new Date()"
                                :format="'dd/MM/yyyy'"
                                v-model="form.date"
                        ></datepicker>
                    </div>
                </div>

                <div class="sub-data-title">
                    <svg>
                        <use xlink:href="@/assets/images/sprite.svg#details"></use>
                    </svg>
                    Product Details
                </div>

                <custom-grid></custom-grid>
            </form>
        </div>
    </div>
</template>

<script>
    import {DropDownList} from '@progress/kendo-vue-dropdowns';
    import {Input} from '@progress/kendo-vue-inputs';
    import {DatePicker} from '@progress/kendo-vue-dateinputs';
    import Breadcrumb from "../components/Breadcrumb";
    import Vue from 'vue'
    import Grid from "./Grid";


    export default {
        name: "NewPurchase",
        components: {
            Breadcrumb,
            'dropdownlist': DropDownList,
            'k-input': Input,
            'datepicker': DatePicker,
            'custom-grid': Grid
        },
        data() {
            return {
                value: {id: 0, name: 'Select Deliver to Whom ...'},
                form: {
                    date: new Date()
                },
                warehouses: [
                    {id: 1, name: 'Warehouse 1'},
                    {id: 2, name: 'Warehouse 2', drafts: ['PR00012', 'PR00013', 'PR00014', 'PR00015']},
                    {id: 3, name: 'Warehouse 3', drafts: ['PR00016', 'PR00017', 'PR00018', 'PR00020']},
                    {id: 4, name: 'Warehouse 4'},
                    {id: 5, name: 'Warehouse 5', drafts: ['PR00022', 'PR00034', 'PR00044', 'PR00035']},
                    {id: 6, name: 'Warehouse 6'},
                ],
                drafts: [],
                showDraft: false,
                filter: {
                    logic: "and",
                    filters: []
                },
                skip: 0,
                take: 10,
            }
        },
        computed: {},
        methods: {
            warehouseSelected(event) {
                Vue.set(this.value, 'id', event.value.id);
                Vue.set(this.value, 'name', event.value.name);
                Vue.set(this.form, 'warehouse', event.value.id);
                this.showDraft = false;
                if (Object.hasOwnProperty.call(event.value, 'drafts')) {
                    this.drafts = event.value.drafts;
                } else this.drafts = []
            }
        }
    }
</script>

<style scoped>

</style>