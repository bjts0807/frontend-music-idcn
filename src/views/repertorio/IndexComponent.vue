<template>
    <div class="iq-card  iq-mb-3">
        <div class="iq-card-header d-flex justify-content-between">
            <div class="iq-header-title">
                <h4 class="card-title">Repertorio de Canciones</h4>
            </div>
            <div class="iq-card-header-toolbar d-flex align-items-center">
               <button  class="btn btn-primary btn-sm shadow-sm mb-2" type="button" @click="newRepertorio()">
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
                                    <i class="la la-headphones"></i>
                                </div>
                                <div class="media-support-info ml-3">
                                    <h6 class="text-primary">{{item.nombre}}</h6>
                                    <p class="mb-0 font-size-12 text-dark">Ensayo: {{$filters.formatDate(item.fecha_ensayo)}}</p>
                                    <p class="mb-0 font-size-12 text-dark">Ejecución: {{$filters.formatDate(item.fecha_ejecucion)}}</p>
                                </div>
                                <div class="iq-card-header-toolbar d-flex align-items-center">
                                    <button @click="editRepertorio(item.id);" type="button" class="btn btn-outline-dark rounded-pill mb-1 mx-2" title="Editar">
                                        <i class="fa fa-edit"></i>
                                    </button>
                                    <button type="button" @click="showRepertorio(item.id);" class="btn btn-outline-secondary rounded-pill mb-1 mx-2" title="Ver">
                                        <i class="fa fa-eye"></i>
                                    </button>
                                    <button type="button" @click="deleteRepertorio(item.id);" class="btn btn-outline-danger rounded-pill mb-1 mx-2" title="Eliminar">
                                        <i class="fa fa-trash"></i>
                                    </button>
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
import repertorioService from "../../services/repertorioService";
import paginateMixin from "../../mixins/PaginateMixin";
import Swal from "sweetalert2";

export default {
    components:{
       DataGrid 
    },
    mixins: [paginateMixin(repertorioService)],
    data(){
        return {
            headers : [
                'Nombre',
                'Opciones'
            ],
        }
    },
    methods:{
        newRepertorio(){
            this.$router.push({
                name:'create.repertorio'
            })
        },
        editRepertorio(id){
            this.$router.push({
                name:'edit.repertorio',
                params:{id_repertorio:id}
            })
        },
        showRepertorio(id){
            this.$router.push({
                name:'show.repertorio',
                params:{id_repertorio:id}
            })
        },
        async deleteRepertorio(id){
            try{
                const result = await Swal.fire({
                title :  "¿Está seguro de eliminar este repertorio ?",
                text : "",
                showCancelButton : true,
                showConfirmButton : true,
                confirmButtonColor: "#ff4545",
                confirmButtonText : 'Sí, Eliminar',
                cancelButtonText : 'No',
                icon : "warning",
                showLoaderOnConfirm : true,
                preConfirm: async () => {
                    try{
                        await repertorioService.delete(id)
                        this.index();
                    }catch (e) {
                        console.error(e);
                        Swal.fire({
                            title: 'Oops!',
                            text: 'Ha ocurrido un error al procesar la solicitud',
                            icon: 'error',
                            confirmButtonColor: '#ff4545'
                        })
                    }
                },
                });
                if(result.isConfirmed){
                    Swal.fire({
                        text: 'Datos eliminados éxito',
                        icon: 'success',
                        confirmButtonColor: '#ff4545'
                    });
                }
            }catch (e) {
                console.error(e);
            }
        }
    },
  created() {
    this.index();
  },
}
</script>