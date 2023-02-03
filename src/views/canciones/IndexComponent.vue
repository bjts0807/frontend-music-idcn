<template>
    <div class="iq-card  iq-mb-3">
        <div class="iq-card-header d-flex justify-content-between">
            <div class="iq-header-title">
                <h4 class="card-title">Canciones</h4>
            </div>
            <div class="iq-card-header-toolbar d-flex align-items-center">
               <button  class="btn btn-primary btn-sm shadow-sm mb-2" type="button" @click="newCancion()">
                    Nuevo <i class="fa fa-plus fa-fw"></i>
                </button>
            </div>
        </div>
        <div class="iq-card-body">
            <data-grid :data="pagination" :search-box="true"  @search="index()">
                <template #grid>
                    <div  v-for="item in pagination.data" :key="item.id">
                        <ul class="list-inline">
                            <li class="d-flex mb-3 align-items-center p-3 sell-list border border-light rounded">
                                <div class="user-img img-fluid">
                                    <img src="images/user/01.jpg" alt="story-img" class="img-fluid rounded-circle avatar-40">
                                </div>
                                <div class="media-support-info ml-3">
                                    <h6 class="text-primary">{{item.nombre}}</h6>
                                    <p class="mb-0 font-size-12 text-dark">Autor: {{item.artista.nombre}}</p>
                                </div>
                                <div class="iq-card-header-toolbar d-flex align-items-center">
                                    <button @click="editCancion(item.id);" type="button" class="btn btn-outline-dark rounded-pill mb-1 mx-2" title="Editar">
                                        <i class="fa fa-edit"></i>
                                    </button>
                                    <!-- <button type="button" class="btn btn-outline-secondary rounded-pill mb-1 mx-2" title="Ver">
                                        <i class="fa fa-eye"></i>
                                    </button>
                                    <button type="button" class="btn btn-outline-danger rounded-pill mb-1 mx-2" title="Eliminar">
                                        <i class="fa fa-trash"></i>
                                    </button> -->
                                </div>
                            </li>
                        </ul>
                    </div>
                </template>
            </data-grid>
        </div>
    </div>
</template>
<script>
    
import DataGrid from "../../components/utilities/DataGrid/DataGrid";
import cancionService from "../../services/cancionService";
import Swal from "sweetalert2";
import paginateMixin from "../../mixins/PaginateMixin";

export default {
    components:{
       DataGrid 
    },
    mixins: [paginateMixin(cancionService)],
  data(){
    return {
        headers : [
            'Nombre',
            'Opciones'
        ],
    }
  },
  methods:{
    async getCanciones(){
        try {
            this.LoaderSpinnerShow();
            const response = await cancionService.index();
            console.log(response.data);
            this.LoaderSpinnerHide(); 
        }catch (e) {
            console.error(e);
            this.LoaderSpinnerHide(); 
            Swal.fire({
                title: 'Oops!',
                text: 'Ha ocurrido un error al procesar la solicitud',
                icon: 'error',
                confirmButtonColor: '#ff4545'
            })
        }
    },
    newCancion(){
        this.$router.push({
            name:'create.canciones'
        })
    },
    editCancion(id){
        this.$router.push({
            name:'edit.canciones',
            params:{id_cancion:id}
        })
    }
  },
  created() {
    this.index();
  },
}
</script>