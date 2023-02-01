<template>
     <div class="iq-card  iq-mb-3">
         <div class="iq-card-header d-flex justify-content-between">
            <div class="iq-header-title">
                <h4 class="card-title">Actualización de Canciones</h4>
            </div>
            <div class="iq-card-header-toolbar d-flex align-items-center">
               <button  class="btn btn-primary btn-sm shadow-sm mb-2" type="button" @click="saveCancion()">
                   <i class="fa fa-save fa-fw"></i> Guardar canción
                </button>
            </div>
        </div>
        <div class="iq-card-body">
            <div class="row">
                <div class="mb-3 col-lg-6 col-sm-12 col-xs-12 col-md-6">
                    <label class="form-label">Nombre <span class="text-danger">(*)</span></label>
                    <input type="text" class="form-control" style="height:40px;" v-model="nombre_cancion">
                    <div v-if="v$.nombre_cancion.$error" class="text-danger" style="font-size:14px" >
                        <i class="fa fa-warning fa-fw"></i> Este campo es requerido.
                    </div>
                </div>
                <div class="mb-3 col-lg-6 col-sm-12 col-xs-12 col-md-6">
                    <label class="form-label">Artista <span class="text-danger">(*)</span></label>
                    <VSelectArtista v-model="artista" :mode="'object'" ></VSelectArtista>
                    <div v-if="v$.artista.$error" class="text-danger" style="font-size:14px" >
                        <i class="fa fa-warning fa-fw"></i> Este campo es requerido.
                    </div>
                </div>
            </div>
            <div class="iq-mb-3 ">
                <div class="card-header">
                    Detalles de la canción
                </div>
                <div class="iq-card-body">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="mb-3 col-lg-12 col-sm-12 col-xs-12 col-md-12">
                                <label class="form-label">Nombre <span class="text-danger">(*)</span></label>
                                <input type="text" v-model="item.nombre_detalle" class="form-control" style="height:40px;">
                                <div v-if="v$.item.nombre_detalle.$error" class="text-danger" style="font-size:14px" >
                                    <i class="fa fa-warning fa-fw"></i> Este campo es requerido.
                                </div>
                            </div>
                            <div class="mb-3 col-lg-12 col-sm-12 col-xs-12 col-md-12">
                                <label class="form-label">Contenido <span class="text-danger">(*)</span></label>
                                <textarea rows="2" cols="10" class="form-control" v-model="item.contenido"></textarea>
                                <div v-if="v$.item.contenido.$error" class="text-danger" style="font-size:14px" >
                                    <i class="fa fa-warning fa-fw"></i> Este campo es requerido.
                                </div>
                            </div>
                            <div class="form-group align-content-end text-right">
                                <button type="button" class="btn btn-primary btn-sm shadow-sm" @click="addCancion();">
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
                                        <h6 class="text-primary text-uppercase">{{item.nombre_detalle}}</h6>
                                        <p class="mb-0 font-size-18 text-dark">{{item.contenido}}</p>
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
    import VSelectArtista from "../../components/common/VSelectArtistas";
    import {isEmpty} from "lodash";
    import useVuelidate from '@vuelidate/core'
    import { required } from '@vuelidate/validators';
    import cancionService from "../../services/cancionService";
    import Swal from 'sweetalert2';

    export default {
        components:{VSelectArtista},
        setup: () => ({ v$: useVuelidate() }),
        data(){
            return {
                id_cancion:'',
                artista:{},
                nombre_cancion:'',
                item: {
                    nombre_detalle:"",
                    contenido: "",
                },
                items:[],
            }
        },
        validations () {
            return {
                item:{ 
                    nombre_detalle: {required},
                    contenido: {required}
                },
                artista: {required},
                nombre_cancion:{required}
            }
        },
        methods: {
            async addCancion() {
                if (!await this.v$.item.$validate()) return;
                this.items.push({...this.item});
                this.item.nombre_detalle='';
                this.item.contenido='';
            },
            deleteDetalle(index) {
                this.items.splice(index, 1);
            },
            async saveCancion() {
                try {

                    if (!await this.v$.nombre_cancion.$validate()) return;
                    if (!await this.v$.artista.$validate()) return;

                    if (isEmpty(this.items)) {
                        Swal.fire({
                            title: 'Oops!',
                            text: 'Debe agregar por lo menos un detalle de la canción',
                            icon: 'error',
                            confirmButtonColor: '#ff4545'
                        });
                        return;
                    }

                    this.LoaderSpinnerShow();
                    
                    let cancion={
                        id_cancion:this.id_cancion,
                        nombre:this.nombre_cancion,
                        artista:this.artista,
                        detalles:this.items
                    }
                    await cancionService.update(cancion);

                    this.clear();
                    
                    await this.LoaderSpinnerHide();

                    await Swal.fire({
                        //title: 'Sweet!',
                        text: 'Datos Guardados con éxito!',
                        icon: 'success',
                        confirmButtonColor: '#ff4545'
                    })          
                    
                    this.$router.push({
                        name:'index.canciones'
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
                this.item.nombre_detalle='';
                this.item.contenido='';
                this.artista={};
                this.nombre_cancion='';
                this.v$.nombre_cancion.$reset();
                this.v$.artista.$reset();
                this.v$.item.$reset();
            },
            async show(){
                try {
                    this.LoaderSpinnerShow();

                    const response=await cancionService.show(this.id_cancion);
                    this.nombre_cancion=response.data.nombre;
                    this.artista={
                        id:response.data.artista.id,
                        text:response.data.artista.nombre
                    };
                    this.items=response.data.detalles.map(x=>{
                        return {
                            nombre_detalle:x.nombre,
                            contenido:x.contenido
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
            this.id_cancion=this.$route.params.id_cancion;
           await this.show();
        }
    }
</script>