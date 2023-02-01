<template>
<div class="iq-sidebar">
         <div class="iq-sidebar-logo d-flex justify-content-between">
            <a href="index.html" class="header-logo">
               <img src="../../assets/logo.png" class="img-fluid rounded-normal" alt="Logo">
               <div class="logo-title">
                  <span class="text-primary text-uppercase font-size-16">Obed-Edom</span> 
               </div>
            </a>
            <div class="iq-menu-bt-sidebar">
               <div class="iq-menu-bt align-self-center">
                  <div class="wrapper-menu">
                     <div class="main-circle"><i class="las la-bars"></i></div>
                  </div>
               </div>
            </div>
         </div>
         <div id="sidebar-scrollbar">
            <nav class="iq-sidebar-menu">
               <ul id="iq-sidebar-toggle" class="iq-menu">
                  <li>
                     <router-link :to="{name:'Dashboard'}" class="iq-waves-effect"><i class="las la-house-damage iq-arrow-left"></i><span>Inicio</span></router-link>
                  </li> 
                  <!-- <li class="active active-menu">
                     <a href="#dashboard" class="iq-waves-effect" data-toggle="collapse" aria-expanded="true"><span class="ripple rippleEffect"></span><i class="las la-home iq-arrow-left"></i><span>Dashboard</span><i class="ri-arrow-right-s-line iq-arrow-right"></i></a>
                     <ul id="dashboard" class="iq-submenu collapse show" data-parent="#iq-sidebar-toggle">
                        <li class="active"><a href="index.html"><i class="las la-house-damage"></i>Home</a></li>
                        <li><a href="latest.html"><i class="las la-headphones"></i>Latest</a></li>
                        <li><a href="albums.html"><i class="lar la-file-audio"></i>Albums</a></li>
                     </ul>
                  </li> -->
                  <li>
                     <a href="#admin" class="iq-waves-effect" data-toggle="collapse" aria-expanded="false"><span class="ripple rippleEffect"></span><i class="las la-user-tie iq-arrow-left"></i><span>Artistas</span><i class="ri-arrow-right-s-line iq-arrow-right"></i></a>
                     <ul id="admin" class="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                        <li>
                           <router-link :to="{name:'index.artistas'}">
                              <i class="las la-list"></i>Listado
                           </router-link>
                        </li>
                     </ul>
                  </li><!-- 
                  <li>
                     <a href="calendar.html" class="iq-waves-effect"><i class="las la-calendar iq-arrow-left"></i><span>Calendar</span></a>
                  </li> -->
                  <li>
                     <a href="#userinfo" class="iq-waves-effect" data-toggle="collapse" aria-expanded="false"><span class="ripple rippleEffect"></span><i class="lar la-file-audio iq-arrow-left"></i><span>Canciones</span><i class="ri-arrow-right-s-line iq-arrow-right"></i></a>
                     <ul id="userinfo" class="iq-submenu collapse" data-parent="#iq-sidebar-toggle" style="">
                        <li>
                           <router-link :to="{name:'index.canciones'}">
                              <i class="las la-list"></i>Listado
                           </router-link>
                        </li>
                     </ul>
                  </li>
               </ul>
            </nav>
         </div>
      </div>
</template>