<template>
    <div class="iq-card  iq-mb-3">
        <div class="iq-card-header d-flex justify-content-between">
            <div class="iq-header-title">
                <h4 class="card-title">Artistas</h4>
            </div>
        </div>
        <div class="iq-card-body">
            <data-grid :data="pagination"
                @changePage="changePage($event)"
                @perPageChange="perPageChange($event)"
                @search="search($event)">
                <template #grid>
                    <grid-table>
                    <template #head>
                        <grid-cell-header class="bg-light"  v-for="(h,i) in headers" :key="`h_${i}`">{{h}}</grid-cell-header>
                    </template>
                    <template #body>
                        <grid-row v-for="(item, i) in pagination.data" :key="`d_${i}`">                        
                            <grid-cell class=" small">
                                <div class="iq-thumb-hotsong">
                                    <img src="images/dashboard/album-song/01.png" class="img-fluid avatar-50 mx-2" alt="">
                                    {{item.nombre}}                                   
                                </div>                            
                            </grid-cell>
                            <grid-cell class="text-center   ">
                                <div class=" ">
                                <button @click="openModalEdit(item.id);" class="btn btn-outline-dark  btn-sm" title="Editar" >
                                    <i class="fa fa-edit"></i>Editar
                                </button>
                                <!-- <button @click="deleteMember(item.id);" class="btn btn-outline-danger  btn-sm" title="Eliminar">
                                    <i class="fa fa-trash-alt"></i>
                                </button> -->
                            </div>
                            </grid-cell>
                        </grid-row>
                    </template>
                    </grid-table>
                </template>
                <template #action-button>
                <button  class="btn btn-primary btn-sm shadow-sm mb-2" type="button" data-toggle="modal" @click="openModal()">
                    Nuevo &nbsp;<i class="fa fa-plus"></i>
                </button>
                </template>
            </data-grid>
            <modal-artista ref="modalArtistas" v-on:get-artistas="getArtistas"></modal-artista>
        </div>
    </div>
</template>
<script>
    
import DataGrid from "../../components/utilities/DataGrid/DataGrid";
import GridTable from "../../components/utilities/DataGrid/GridTable";
import GridCellHeader from "../../components/utilities/DataGrid/GridCellHeader";
import GridRow from "../../components/utilities/DataGrid/GridRow";
import GridCell from "../../components/utilities/DataGrid/GridCell";
import artistaService from "../../services/artistaService";
import modalArtista from "./ModalArtista";
import Swal from "sweetalert2";

export default {
    components:{
       GridCell, GridRow, GridCellHeader, GridTable, DataGrid,modalArtista  
    },
  data(){
    return {
        headers : [
            'Nombre',
            'Opciones'
        ],
        pagination : {
            data : [],
            current_page : 1,
            page : 1,
            per_page : 5,
            search : '',
            total: '',
        }
    }
  },
  methods:{
    async getArtistas(){
        try {
            this.LoaderSpinnerShow();
            const response = (await artistaService.index(this.pagination.search, this.pagination))?.data;
            console.log(response.data);
            this.pagination.data = response.data;
            this.pagination.current_page  = response.current_page;
            this.pagination.total = response.total;
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
    changePage(page) {
      this.pagination.page = page;
      this.getArtistas();
    },
    perPageChange(per_page) {
      this.pagination.per_page = per_page;
      this.pagination.page = 1;
      this.getArtistas();
    },
    search(query){
      this.pagination.search = query;
      this.pagination.page = 1;
      this.getArtistas();
    },
    openModal(){
      this.$refs.modalArtistas.openModal();
    },
    openModalEdit(id){
        this.$refs.modalArtistas.edit(id);
    },
  },
  async created(){
    await this.getArtistas();
  }
}
</script>