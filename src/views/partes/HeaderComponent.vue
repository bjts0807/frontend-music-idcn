<template>
  <!-- TOP Nav Bar -->
      <div class="iq-top-navbar">
         <div class="iq-navbar-custom">
            <nav class="navbar navbar-expand-lg navbar-light p-0">
               <div class="iq-menu-bt d-flex align-items-center">
                  <div class="wrapper-menu">
                     <div class="main-circle"><i class="las la-bars"></i></div>
                  </div>
                  <div class="iq-navbar-logo d-flex justify-content-between">
                     <a href="index.html" class="header-logo">
                        <img src="../../assets/logo.png" class="img-fluid rounded-normal" alt="Logo">
                        <div class="pt-2 pl-2 logo-title">
                           <span class="text-primary text-uppercase">MAOE</span>
                        </div>
                     </a>
                  </div>
               </div>
               <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"  aria-label="Toggle navigation">
                  <i class="ri-menu-3-line"></i>
               </button>
               <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="list-unstyled iq-menu-top d-flex justify-content-between mb-0 p-0">
                     <li class="active">App para administrar Canciones</li>

                  </ul>
                  <ul class="navbar-nav ml-auto navbar-list">
                     <li class="nav-item nav-icon">
                        <div class="iq-search-bar">
                           Ministerio de Alabanza OBED-EDOM <span class="text-primary">(MAOE)</span>
                        </div>
                     </li>
                     <li class="line-height pt-3">
                        <a href="#" class="search-toggle iq-waves-effect d-flex align-items-center">
                           <img src="images/user/11.png" class="img-fluid rounded-circle" alt="user">
                        </a>
                        <div class="iq-sub-dropdown iq-user-dropdown">
                           <div class="iq-card shadow-none m-0">
                              <div class="iq-card-body p-0 ">
                                 <div class="bg-primary p-3">
                                    <h5 class="mb-0 text-white line-height" v-if="this.$store.state.user">{{this.$store.state.user.name}}</h5>
                                    <span class="text-white font-size-12" v-if="this.$store.state.user">{{this.$store.state.user.email}}</span>
                                 </div>
                                 <a href="profile.html" class="iq-sub-card iq-bg-primary-hover">
                                    <div class="media align-items-center">
                                       <div class="rounded iq-card-icon iq-bg-primary">
                                          <i class="ri-file-user-line"></i>
                                       </div>
                                       <div class="media-body ml-3">
                                          <h6 class="mb-0 ">Mi Perfil</h6>
                                          <p class="mb-0 font-size-12">Ver detalles.</p>
                                       </div>
                                    </div>
                                 </a>
                                 <div class="d-inline-block w-100 text-center p-3">
                                    <a class="bg-primary iq-sign-btn " @click="logout();" role="button">Salir<i class="ri-login-box-line ml-2"></i></a>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </li>
                  </ul>
               </div>
            </nav>
         </div>
      </div>
      <!-- TOP Nav Bar END -->

</template>
<script>

import {  mapState } from "vuex";
import {useStore} from 'vuex';
import Swal from "sweetalert2";

export default {
  name: "HeaderComponent",
  setup (){
    const store = useStore();
    const logout = async () => {
      try{
        const result = await Swal.fire({
          title :  "¿Está seguro de finalizar la Sesión ?",
          text : "",
          showCancelButton : true,
          showConfirmButton : true,
          confirmButtonColor: "#ff4545",
          confirmButtonText : 'Sí, finalizar',
          cancelButtonText : 'No',
          icon : "warning",
          showLoaderOnConfirm : true,
          preConfirm: async () => {
            try{
             await store.dispatch('logout')
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
            text: 'Sesión finalizada con éxito',
               icon: 'success',
               confirmButtonColor: '#ff4545'
          });
          
        }
      }catch (e) {
        console.error(e);
      }
    }
    return {
      logout
    }
  },
  methods:{
    toggle(){
      const select = (el, all = false) => {
        el = el.trim()
        if (all) {
          return [...document.querySelectorAll(el)]
        } else {
          return document.querySelector(el)
        }
      }
      select('body').classList.toggle('toggle-sidebar')
    }
  },

  computed: {
    ...mapState(["is_logged", 'user']),
    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>