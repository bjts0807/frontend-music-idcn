import periodoContableService from "../services/periodoContableService";

const AccountingPeriodMixin = () => ({
    data(){
        return {
            periodoContable : {
                id : '',
                fecha_inicio : '',
                fecha_fin : ''
            }
        }
    },
    async created (){
        this.periodoContable = (await periodoContableService.active())?.data;
    }
});

export default AccountingPeriodMixin;
