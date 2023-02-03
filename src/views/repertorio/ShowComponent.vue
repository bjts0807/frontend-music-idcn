<template>
     <div class="iq-card  iq-mb-3">
         <div class="iq-card-header d-flex justify-content-between">
            <div class="iq-header-title">
                <h5 class="card-title">Detalle de Repertorio : <span class="text-primary">{{nombre_repertorio}} ({{$filters.formatDate(fecha_ejecucion)}})</span></h5>
            </div>
        </div>
        <div class="iq-card-body">
            <div class="iq-mb-3 ">
                <div class="card-header">
                    <i class="fa fa-list"></i> Lista de canciones
                </div>
                <div class="iq-card-body">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="nav flex-column nav-pills text-center" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <a v-for="(item,i) in items" :key="item.id_repertorio" 
                                    class="nav-link" 
                                    :class="{ active: i === 0 }"
                                    :id="`v-pills-home-tab_${item.id_repertorio}`"
                                    data-toggle="pill"
                                    :href="`#v-pills-home_${item.id_repertorio}`"
                                    role="tab"
                                    aria-controls="v-pills-home" 
                                    aria-selected="true">{{item.cancion.text}}
                                    <p><i class="text-dark font-size-12">{{item.miembro.text}}</i></p>
                                </a>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="tab-content mt-0" id="v-pills-tabContent">
                                <div class="tab-pane fade" v-for="(item,i) in items" :key="item.id_repertorio" 
                                    :class="{ 'show active': i === 0 }"
                                    :id="`v-pills-home_${item.id_repertorio}`"
                                    data-toggle="pill"
                                    role="tabpanel" aria-labelledby="v-pills-home-tab"
                                >
                                    <ul>
                                        <li v-for="detalle in item.cancion.detalles" :key="detalle.id" class="d-flex mb-3 align-items-center p-3 sell-list border border-light rounded">
                                            <div class="user-img img-fluid">
                                                <i class="fa fa-list-alt fa-2x"></i>
                                            </div>
                                            <div class="media-support-info ml-3">
                                                <h6 class="text-primary text-uppercase">{{detalle.nombre}}</h6>
                                                <p class="mb-0 font-size-12 text-dark"> {{detalle.contenido}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                   </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Swal from "sweetalert2";
    import repertorioService from "../../services/repertorioService";
    export default {
        data(){
            return {
                id_repertorio:'',
                nombre_repertorio:'',
                fecha_ensayo:'',
                fecha_ejecucion:'',
                items:[],
            }
        },
        methods: {
            async show(){
                try {
                    this.LoaderSpinnerShow();

                    const response=await repertorioService.show(this.id_repertorio);
                    this.nombre_repertorio=response.data.nombre;
                    this.fecha_ejecucion=response.data.fecha_ejecucion;
                    this.fecha_ensayo=response.data.fecha_ensayo;

                    this.items=response.data.detalles.map(x=>{
                        return {
                            id_repertorio:x.id,
                            miembro:{
                                id:x.miembro.id,
                                text:`${x.miembro.first_name} ${x.miembro.second_name} ${x.miembro.first_surname} ${x.miembro.second_surname}`
                            },
                            cancion:{
                                id:x.cancion.id,
                                text: `${x.cancion.nombre}`,
                                detalles:x.cancion.detalles
                            },
                            observacion:x.observacion
                        }
                    })

                    this.LoaderSpinnerHide();
                } catch (error) {
                    console.log(error);
                    this.LoaderSpinnerHide();
                    Swal.fire({
                        title: 'Oops!',
                        text: 'Ha ocurrido un error al procesar la solicitud',
                        icon: 'error',
                        confirmButtonColor: '#ff4545'
                    })
                }
            }
        },
        async created(){
            this.id_repertorio=this.$route.params.id_repertorio;
           await this.show();
        }
    }
</script>