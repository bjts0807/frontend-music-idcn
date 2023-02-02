<template>
    <div class="iq-card  iq-mb-3">
        <div class="iq-card-header d-flex justify-content-between">
            <div class="iq-header-title">
                <h4 class="card-title">Miembros</h4>
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
                                {{item.first_name}} {{item.second_name}} {{item.first_surname}} {{item.second_surname}}                           
                            </grid-cell>
                            <grid-cell class=" small">
                                {{item.phone}}                           
                            </grid-cell>
                            <grid-cell class="text-center">
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
            <modal-miembro ref="modalMembers" v-on:get-members="getMembers"></modal-miembro>
        </div>
    </div>
</template>
<script>
    
import DataGrid from "../../components/utilities/DataGrid/DataGrid";
import GridTable from "../../components/utilities/DataGrid/GridTable";
import GridCellHeader from "../../components/utilities/DataGrid/GridCellHeader";
import GridRow from "../../components/utilities/DataGrid/GridRow";
import GridCell from "../../components/utilities/DataGrid/GridCell";
import memberService from "../../services/memberService";
import modalMiembro from "./ModalMiembro";
import Swal from "sweetalert2";

export default {
    components:{
       GridCell, GridRow, GridCellHeader, GridTable, DataGrid,modalMiembro  
    },
  data(){
    return {
        headers : [
            'Nombre',
            'Contacto',
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
    async getMembers(){
        try {
            this.LoaderSpinnerShow();
            const response = (await memberService.index(this.pagination.search, this.pagination))?.data;
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
      this.getMembers();
    },
    perPageChange(per_page) {
      this.pagination.per_page = per_page;
      this.pagination.page = 1;
      this.getMembers();
    },
    search(query){
      this.pagination.search = query;
      this.pagination.page = 1;
      this.getMembers();
    },
    openModal(){
      this.$refs.modalMembers.openModal();
    },
    openModalEdit(id){
        this.$refs.modalMembers.edit(id);
    },
  },
  async created(){
    await this.getMembers();
  }
}
</script>