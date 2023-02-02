<template>
    <div class="modal fade" id="modalArtista" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Registro de Artistas</h5>
                    <button type="button" class="close"  @click="closeModal();" aria-label="Close">
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
                    <div class="mb-3 col-lg-12 col-md-12 col-sm-12">
                        <div class="form-group">
                            <label class="form-label">Imagen</label>
                            <file-pond
                                name="test"
                                ref="pond"
                                 max-files="1"
                                class-name="my-pond"
                                label-idle="Arrastre una imagen o examine su pc..."
                                allow-multiple="false"
                                accepted-file-types="image/jpeg, image/png, image/jpg"
                                labelFileTypeNotAllowed="Tipo de archivo no es valido..."
                                fileValidateTypeLabelExpectedTypes="Archivos permitidos png, jpg"
                                v-on:updatefiles="handleFilePondUpdateFile"
                            />
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" @click="closeModal();"><i class="fa fa-times-circle fa-fw"></i>Cerrar</button>
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
    import {isEmpty} from 'lodash';
    
    import vueFilePond from 'vue-filepond';

    // Import plugins
    import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js';
    import FilePondPluginImagePreview from 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js';
    // Import the plugin code
    import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
    // Import styles
    import 'filepond/dist/filepond.min.css';
    import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

    // Create FilePond component
    const FilePond = vueFilePond( FilePondPluginImagePreview,FilePondPluginFileEncode,FilePondPluginFileValidateType);

    export default {
        setup: () => ({ v$: useVuelidate() }),
        components:{FilePond},
        data(){
            return {
                artista: {
                    id:"",
                    nombre: "",
                    imagen:''
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
            handleFilePondUpdateFile(files){
                this.artista.imagen = files;
            },
            openModal(){
                this.modalShow();
            },
            async save() {
                try {

                    if (!await this.v$.artista.$validate()) return;

                    this.LoaderSpinnerShow();

                    //const formData = new FormData();

                    let datos={
                        id: this.artista.id,
                        nombre: this.artista.nombre,
                        imagen:(!isEmpty(this.artista.imagen))?this.artista.imagen[0].getFileEncodeBase64String():""
                    }
                    /* formData.append('id', this.artista.id);
                    formData.append('nombre', this.artista.nombre);
                    formData.append('imagen',this.imagen[0].getFileEncodeBase64String()); */

                    if (this.type === "store") {
                        await artistaService.store(datos);
                        this.type = "store";
                        this.clear();
                    } else if (this.type === "edit") {
                        await artistaService.update(datos);
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
                this.artista.imagen = "";
                this.v$.artista.$reset();
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