<template>
    <div>
        <breadcrumb>
            <li><router-link to="/">Inventory</router-link></li>
            <li><router-link to="/">Inventory Operations</router-link></li>
            <li><router-link to="/">Purchase Requisition List</router-link></li>
            <li><span>New Purchase Requisition</span></li>
        </breadcrumb>
    </div>
</template>

<script>
    import Breadcrumb from "../components/Breadcrumb";
    export default {
        name: "NewPurchase",
        components: {Breadcrumb}
    }
</script>

<style scoped>

</style>