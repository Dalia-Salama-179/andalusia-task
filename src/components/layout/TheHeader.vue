<template>
    <header>
        <!-- logo -->
        <div class="logo-wrapper">
            <img src="@/assets/images/logo-placeholder.png" alt="Logo">
        </div>


        <!-- language - user profile -->
        <div class="right-side">
            <div class="language">
                <dropdownlist
                        :data-items='languages'
                        :text-field="'value'"
                        :data-item-key="'key'"
                        v-model="selectedLang"
                >
                </dropdownlist>
            </div>

            <kendo-menu>
                <li>
                    <div class="user-data">
                        <img src="@/assets/images/avatar-placeholder.png" alt="">
                        <div>
                            <p>Mahmoud Raslan</p>
                            <p>Physician</p>
                        </div>
                    </div>
                    <ul>
                        <li>Profile</li>
                        <li>Logout</li>
                    </ul>
                </li>
            </kendo-menu>
        </div>

    </header>
</template>

<script>
    import {DropDownList} from '@progress/kendo-vue-dropdowns';
    import { Menu } from '@progress/kendo-layout-vue-wrapper';


    export default {
        name: "TheHeader",
        components: {
            'dropdownlist': DropDownList,
            'kendo-menu': Menu,
        },
        data: function () {
            return {
                languages: [
                    {key: 'en', value: 'EN'},
                    {key: 'ar', value: 'AR'},
                ],
                selectedLang: {key: 'en', value: 'EN'}
            };
        },

        methods: {
            handleLanguageChange(event) {
                this.selectedLang = event.value;
            }
        }
    }
</script>

<style scoped>

</style>