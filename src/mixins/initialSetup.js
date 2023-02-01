import configuracionInicialService from "../services/configuracionInicialService"

const initialSetupMixin = (code) => ({
    data(){
        return {
            configuracionInicial : {}
        }
    },
    methods : {
        async updateInitialSetup(status) {
            this.LoaderSpinnerShow();
            this.configuracionInicial.status = status;
            await configuracionInicialService.update(this.configuracionInicial);
            this.LoaderSpinnerHide();
        },
        async loadInitialSetup(){
            this.configuracionInicial = (await configuracionInicialService.show(code))?.data;
        }
    },
});

export default initialSetupMixin;
