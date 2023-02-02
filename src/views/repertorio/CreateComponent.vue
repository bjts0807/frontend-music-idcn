<template>
     <div class="iq-card  iq-mb-3">
         <div class="iq-card-header d-flex justify-content-between">
            <div class="iq-header-title">
                <h4 class="card-title">Registro de Repertorio</h4>
            </div>
            <div class="iq-card-header-toolbar d-flex align-items-center">
               <button  class="btn btn-primary btn-sm shadow-sm mb-2" type="button" @click="saveRepertorio()">
                   <i class="fa fa-save fa-fw"></i> Guardar repertorio
                </button>
            </div>
        </div>
        <div class="iq-card-body">
            <div class="row">
                <div class="mb-3 col-lg-4 col-sm-12 col-xs-12 col-md-6">
                    <label class="form-label">Nombre <span class="text-danger">(*)</span></label>
                    <input type="text" class="form-control" style="height:40px;" v-model="nombre_repertorio">
                    <div v-if="v$.nombre_repertorio.$error" class="text-danger" style="font-size:14px" >
                        <i class="fa fa-warning fa-fw"></i> Este campo es requerido.
                    </div>
                </div>
                <div class="mb-3 col-lg-4 col-sm-12 col-xs-12 col-md-6">
                    <label class="form-label">Fecha Ensayo <span class="text-danger">(*)</span></label>
                    <input type="date" class="form-control" style="height:40px;" v-model="fecha_ensayo">
                    <div v-if="v$.fecha_ensayo.$error" class="text-danger" style="font-size:14px" >
                        <i class="fa fa-warning fa-fw"></i> Este campo es requerido.
                    </div>
                </div>
                 <div class="mb-3 col-lg-4 col-sm-12 col-xs-12 col-md-6">
                    <label class="form-label">Fecha Ejecución <span class="text-danger">(*)</span></label>
                    <input type="date" class="form-control" style="height:40px;" v-model="fecha_ejecucion">
                    <div v-if="v$.fecha_ejecucion.$error" class="text-danger" style="font-size:14px" >
                        <i class="fa fa-warning fa-fw"></i> Este campo es requerido.
                    </div>
                </div>
            </div>
            <div class="iq-mb-3 ">
                <div class="card-header">
                    Detalles del Repertorio
                </div>
                <div class="iq-card-body">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="mb-3 col-lg-12 col-sm-12 col-xs-12 col-md-6">
                                <label class="form-label">Canción <span class="text-danger">(*)</span></label>
                                <VSelectCanciones v-model="item.cancion" :mode="'object'" ></VSelectCanciones>
                                <div v-if="v$.item.cancion.$error" class="text-danger" style="font-size:14px" >
                                    <i class="fa fa-warning fa-fw"></i> Este campo es requerido.
                                </div>
                            </div>
                            <div class="mb-3 col-lg-12 col-sm-12 col-xs-12 col-md-6">
                                <label class="form-label">Director <span class="text-danger">(*)</span></label>
                                <VSelectMiembros v-model="item.miembro" :mode="'object'" ></VSelectMiembros>
                                <div v-if="v$.item.miembro.$error" class="text-danger" style="font-size:14px" >
                                    <i class="fa fa-warning fa-fw"></i> Este campo es requerido.
                                </div>
                            </div>
                            <div class="mb-3 col-lg-12 col-sm-12 col-xs-12 col-md-12">
                                <label class="form-label">Observaciones </label>
                                <textarea rows="2" cols="10" class="form-control" v-model="item.observacion"></textarea>
                            </div>
                            <div class="form-group align-content-end text-right">
                                <button type="button" class="btn btn-primary btn-sm shadow-sm" @click="addRepertorio();">
                                    <i class="fa fa-plus fa-fw"></i> Añadir
                                </button>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <span class="text-primary"><i>Los detalles aparecerán aquí...</i></span>
                            <ul class="list-inline border border-light p-2 m-2 rounded"  >
                                <li v-for="(item,index) in items" :key="item.id" class="d-flex mb-3 align-items-center p-3 sell-list border border-light rounded">
                                    <div class="user-img img-fluid">
                                        <i class="img-fluid rounded-circle avatar-40 fa fa-list-alt"></i>
                                    </div>
                                    <div class="media-support-info ml-3">
                                        <h6 class="text-primary text-uppercase">{{item.cancion.text}}</h6>
                                        <p class="mb-0 font-size-12 text-dark">Director: {{item.miembro.text}}</p>
                                        <p class="mb-0 font-size-12 text-dark">Observaciones: <i >{{item.observacion}}</i></p>
                                    </div>
                                    <div class="iq-card-header-toolbar d-flex align-items-center">
                                        <button @click="deleteDetalle(index);" type="button" class="btn btn-outline-danger rounded-pill mb-1 mx-2" title="Eliminar">
                                            <i class="fa fa-trash"></i>
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import VSelectCanciones from "../../components/common/VSelectCanciones";
    import VSelectMiembros from "../../components/common/VSelectMiembros";
    import {isEmpty} from "lodash";
    import useVuelidate from '@vuelidate/core'
    import { required } from '@vuelidate/validators';
    import repertorioService from "../../services/repertorioService";
    import Swal from 'sweetalert2';

    export default {
        components:{VSelectCanciones,VSelectMiembros},
        setup: () => ({ v$: useVuelidate() }),
        data(){
            return {
                
                nombre_repertorio:'',
                fecha_ensayo:'',
                fecha_ejecucion:'',
                item: {
                    cancion:{},
                    miembro:{},
                    observacion:''
                },
                items:[],
            }
        },
        validations () {
            return {
                item:{ 
                    cancion: {required},
                    miembro: {required}
                },
                fecha_ejecucion: {required},
                nombre_repertorio:{required},
                fecha_ensayo:{required}
            }
        },
        methods: {
            async addRepertorio() {
                if (!await this.v$.item.$validate()) return;
                this.items.push({...this.item});
            },
            deleteDetalle(index) {
                this.items.splice(index, 1);
            },
            async saveRepertorio() {
                try {

                    if (!await this.v$.nombre_repertorio.$validate()) return;
                    if (!await this.v$.fecha_ensayo.$validate()) return;
                    if (!await this.v$.fecha_ejecucion.$validate()) return;

                    if (isEmpty(this.items)) {
                        Swal.fire({
                            title: 'Oops!',
                            text: 'Debe agregar por lo menos un detalle del repertorio',
                            icon: 'error',
                            confirmButtonColor: '#ff4545'
                        });
                        return;
                    }

                    this.LoaderSpinnerShow();
                    
                    let repertorio={
                        nombre:this.nombre_repertorio,
                        fecha_ejecucion:this.fecha_ejecucion,
                        fecha_ensayo:this.fecha_ensayo,
                        detalles:this.items
                    }
                    await repertorioService.store(repertorio);

                    this.clear();
                    
                    await this.LoaderSpinnerHide();

                    await Swal.fire({
                        //title: 'Sweet!',
                        text: 'Datos Guardados con éxito!',
                        icon: 'success',
                        confirmButtonColor: '#ff4545'
                    })                 

                } catch (error) {
                    console.log(error);
                    this.LoaderSpinnerHide()
                    Swal.fire({
                        title: 'Oops!',
                        text: 'Ha ocurrido un error al procesar la solicitud',
                        icon: 'error',
                        confirmButtonColor: '#ff4545'
                    })
                }
            },
            async clear() {
                this.items = [];
                this.item.cancion={};
                this.item.miembro={};
                this.item.observacion={};
                this.nombre_repertorio='';
                this.fecha_ensayo='';
                this.fecha_ejecucion='';
                this.v$.nombre_repertorio.$reset();
                this.v$.fecha_ejecucion.$reset();
                this.v$.fecha_ensayo.$reset();
                this.v$.item.$reset();
            },
        }
    }
</script>