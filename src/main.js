import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import moment from "moment";
import momentjsMixin from "./mixins/momentjs-mixin";

const appInstance = createApp(App);
appInstance.use(store);
appInstance.use(router);
appInstance.mount("#app");
appInstance.use(Loading);
appInstance.use(momentjsMixin);

appInstance.mixin({
    methods: {
        LoaderSpinnerShow: function() {
            this.$options.loader = this.$loading.show({ color: '#ff4545', container: null });
        },
        LoaderSpinnerHide: function() {

            this.$options.loader.hide();
        }
    }
});

appInstance.config.globalProperties.$filters = {
    cop_currency(value) {
        return new Intl.NumberFormat("ES-co", { style: "currency", currency: "COP" }).format(value);
    },

    cop_currency_no_decimals(value){
        return new Intl.NumberFormat("Es-co", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(value);
    },

    formatDate(value) {
        if (value) {
            return moment(String(value)).format('DD/MM/YYYY');
        }
    },
    
    formatDateTime(value) {
        if (value) {
            return moment(String(value)).format('YYYY/MM/DD hh:mm A');
        }
    },
    
    time(value) {
        if (value) {
            return moment(String(value)).format('hh:mm A');
        }
    },
    
    pad_left(value) {
        return value.toString().padStart(3, '0');
    },
    
    truncate(value) {
        return Number(value).toFixed(2);
    }
}