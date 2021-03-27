import Vue from 'vue'
import App from './App.vue'
import './assets/style/index.css'

Vue.config.productionTip = false;
import router from './router'
import '@progress/kendo-ui'
import '@progress/kendo-theme-default/dist/all.css'
import {Calendar} from '@progress/kendo-dateinputs-vue-wrapper'

Vue.component(Calendar.name, Calendar);

new Vue({
    render: h => h(App),
    router,
    components: {
        App,
        Calendar
    }
}).$mount('#app');
