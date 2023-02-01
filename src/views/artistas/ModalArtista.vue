<template>
    
        <div class="modal fade" id="modalArtista" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div class="modal-dialog" role="document">
                                 <div class="modal-content">
                                    <div class="modal-header">
                                       <h5 class="modal-title" id="exampleModalLabel">Registro de Artistas</h5>
                                       <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                       <span aria-hidden="true">&times;</span>
                                       </button>
                                    </div>
                                    <div class="modal-body">
                                       <div class="mb-3 col-lg-12 col-md-12 col-sm-12">
                                <label  class="form-label">Nombre <span class="text-danger">(*)</span></label>
                                <input type="text" class="form-control" v-model="artista.nombre">
                                <div v-if="v$.artista.nombre.$error" class="text-danger" style="font-size:14px" >
                                    <i class="fa fa-warning fa-fw"></i> Este campo es requerido.
                                </div>
                            </div>
                                    </div>
                                    <div class="modal-footer">
                                       <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal"><i class="fa fa-times-circle fa-fw"></i>Cerrar</button>
                                       <button type="button" class="btn btn-primary btn-sm" @click="save();"><i class="fa fa-save fa-fw"></i>Guardar</button>
                                    </div>
                                 </div>
                              </div>
                           </div>
        
    
</template>
<script>
    import useVuelidate from '@vuelidate/core'
    import { required } from '@vuelidate/validators';
    import {Modal} from 'bootstrap';
    import artistaService from "../../services/artistaService";
    import Swal from 'sweetalert2';
    //import $ from 'jquery';
    export default {
        setup: () => ({ v$: useVuelidate() }),
        data(){
            return {
                artista: {
                    id:"",
                    nombre: "",
                },
                type: "store",
            }
        },
        validations () {
            return {
                artista:{ 
                    nombre: {required},
                },
            }
        },
        methods: {
            openModal(){
                this.modalShow();
            },
            async save() {
                try {

                    if (!await this.v$.artista.$validate()) return;

                    this.LoaderSpinnerShow();

                    if (this.type === "store") {
                        await artistaService.store(this.artista);
                        this.type = "store";
                        this.clear();
                    } else if (this.type === "edit") {
                        await artistaService.update(this.artista);
                        this.clear();
                        this.type = "store";
                    }
                
                    await this.LoaderSpinnerHide();

                    await Swal.fire({
                        //title: 'Sweet!',
                        text: 'Datos Guardados con éxito!',
                        icon: 'success',
                        confirmButtonColor: '#ff4545'
                    })

                    this.$emit("get-artistas");

                    this.modalHide();

                } catch (error) {
                    console.log(error);
                    this.LoaderSpinnerHide();
                     await Swal.fire({
                        title: 'Oops!',
                        text: 'Ha ocurrido un error al procesar la solicitud',
                        icon: 'error',
                        confirmButtonColor: '#ff4545'
                    })
                }
            },
            modalShow(){
                var myModal = new Modal(document.getElementById('modalArtista'));
                myModal.show();
            },
            modalHide(){
                let myModal = document.getElementById('modalArtista');
                let m = Modal.getInstance(myModal)
                m.hide();
            },
            clear() {
                this.artista.id = "";
                this.artista.nombre = "";
            },
            closeModal() {
                this.type = "store";
                this.clear();
                this.modalHide();
            },
            async edit(id) {
                
                this.$nextTick(async () => {
                    this.LoaderSpinnerShow();
                    this.type = "edit";
                    this.modalShow();
                    const response = await artistaService.show(id);
                    this.artista.id = response.data.id;
                    this.artista.nombre = response.data.nombre;
                    this.LoaderSpinnerHide();
                });
                
            },
        }
    }
</script>