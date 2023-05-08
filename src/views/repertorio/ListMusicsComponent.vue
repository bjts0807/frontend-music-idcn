<template>
<div class="container-fluid">
     <div class="row">
               
               <div class="col-lg-12">
                  <div class="iq-card iq-card-block iq-card-stretch iq-card-height">
                     <div class="iq-card-header d-flex justify-content-between">
                        <div class="iq-header-title">
                           <h4 class="card-title">Canciones del día</h4>
                        </div>
                     </div>
                     <div class="iq-card-body">
                     <div class="alert alert-danger" v-if="results.repertorio==null">
                        No hay canciones para hoy...
                     </div>
                        <ul class="list-inline p-0 m-0" v-else>
                           <li  v-for="item in results.repertorio.detalles" :key="item.id" class="d-flex mb-3 align-items-center p-3 sell-list border border-secondary rounded">
                              <div class="media-support-info ml-3">
                                 <h6 class="text-primary">{{item.cancion.nombre}}</h6>
                                 <p class="mb-0 font-size-12">{{item.miembro.first_name}} {{item.miembro.second_name}} {{item.miembro.first_surname}} {{item.miembro.second_surname}}</p>
                              </div>
                              <div class="iq-card-header-toolbar d-flex align-items-center">
                                 <button type="button" @click="showMusic(item.cancion.id);" class="btn btn-info rounded-pill mb-1 mx-2" title="Ver">
                                     <i class="fa fa-eye"></i>
                                 </button>
                             </div>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
              
            </div>
                    
</div>
</template>
<script>

   import dashboardService from "../../services/dashboardService";

   export default {
      data(){
         return {
            results:{}
         }
      },
      methods:{
         showMusic(id){
            this.$router.push({
               name:'show.music',
               params:{id_music:id}
            })
        },
      },
      async created(){
         this.LoaderSpinnerShow();
         const response = await dashboardService.index();
         this.results=response.data;
         this.LoaderSpinnerHide();
      }
   }
</script>