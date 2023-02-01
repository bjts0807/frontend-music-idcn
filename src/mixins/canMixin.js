import {toUpper} from "lodash/string";

export default {
    methods : {
        _can(permission){
            let index = this.$store.state.user.all_permissions.findIndex(x =>  toUpper(permission) === toUpper(x));
            return Boolean(index !== -1);
        }
    }
};

