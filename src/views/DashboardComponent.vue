<template>
<div class="container-fluid">
     <div class="row">
               <div class="col-sm-6 col-md-6 col-lg-3">
                  <div class="iq-card iq-card-block iq-card-stretch iq-card-height">
                     <div class="iq-card-body">
                        <div class="d-flex align-items-center justify-content-between">
                           <h6>Total Artistas</h6>
                           <span class="iq-icon"><i class="ri-information-fill"></i></span>
                        </div>
                        <div class="iq-customer-box d-flex align-items-center justify-content-between mt-3">
                           <div class="iq-map text-primary font-size-32"><i class="ri-bar-chart-grouped-line"></i></div>
                           <div class="d-flex align-items-center">
                              <h2>{{results.total_artistas}}</h2>
                              <div class="rounded-circle iq-card-icon iq-bg-primary ml-3"> <i class="ri-inbox-fill"></i></div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="col-sm-6 col-md-6 col-lg-3">
                  <div class="iq-card iq-card-block iq-card-stretch iq-card-height">
                     <div class="iq-card-body">
                        <div class="d-flex align-items-center justify-content-between">
                           <h6>Total Canciones</h6>
                           <span class="iq-icon"><i class="ri-information-fill"></i></span>
                        </div>
                        <div class="iq-customer-box d-flex align-items-center justify-content-between mt-3">
                           <div class="iq-map text-success font-size-32"><i class="ri-bar-chart-grouped-line"></i></div>
                           <div class="d-flex align-items-center">
                              <h2>{{results.total_canciones}}</h2>
                              <div class="rounded-circle iq-card-icon iq-bg-success ml-3"><i class="ri-price-tag-3-line"></i></div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="col-sm-6 col-md-6 col-lg-3">
                  <div class="iq-card iq-card-block iq-card-stretch iq-card-height">
                     <div class="iq-card-body">
                        <div class="d-flex align-items-center justify-content-between">
                           <h6>Total Miembros</h6>
                           <span class="iq-icon"><i class="ri-information-fill"></i></span>
                        </div>
                        <div class="iq-customer-box d-flex align-items-center justify-content-between mt-3">
                           <div class="iq-map text-danger font-size-32"><i class="ri-bar-chart-grouped-line"></i></div>
                           <div class="d-flex align-items-center">
                              <h2>{{results.total_miembros}}</h2>
                              <div class="rounded-circle iq-card-icon iq-bg-danger ml-3"><i class="ri-radar-line"></i></div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="col-sm-6 col-md-6 col-lg-3">
                  <div class="iq-card iq-card-block iq-card-stretch iq-card-height">
                     <div class="iq-card-body">
                        <div class="d-flex align-items-center justify-content-between">
                           <h6>Total Repertorios</h6>
                           <span class="iq-icon"><i class="ri-information-fill"></i></span>
                        </div>
                        <div class="iq-customer-box d-flex align-items-center justify-content-between mt-3">
                           <div class="iq-map text-info font-size-32"><i class="ri-bar-chart-grouped-line"></i></div>
                           <div class="d-flex align-items-center">
                              <h2>{{results.total_repertorio}}</h2>
                              <div class="rounded-circle iq-card-icon iq-bg-info ml-3"><i class="ri-refund-line"></i></div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="col-lg-4">
                  <div class="iq-card iq-card-block iq-card-stretch iq-card-height">
                     <div class="iq-card-body">
                        <img src="../assets/logo.png" class=" img-fluid" alt="Logo">
                     </div>
                  </div>
               </div>
               <div class="col-lg-8">
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
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
              
            </div>
                    
</div>
</template>
<script>

   import dashboardService from "../services/dashboardService";

   export default {
      data(){
         return {
            results:{}
         }
      },
      async created(){
         this.LoaderSpinnerShow();
         const response = await dashboardService.index();
         this.results=response.data;
         this.LoaderSpinnerHide();
      }
   }
</script>