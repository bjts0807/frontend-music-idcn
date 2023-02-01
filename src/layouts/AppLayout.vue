<template>
  <div class="wrapper">
    <SidebarComponent/>

    <HeaderComponent/>

    
    <div id="content-page" class="content-page">
      <router-view />
      <FooterComponent />
    </div>

    

    
  </div>
</template>

<script>

  import SidebarComponent from '../views/partes/SidebarComponent';
  import HeaderComponent from '../views/partes/HeaderComponent';
  import FooterComponent from '../views/partes/FooterComponent';

  export default {
    name: 'AppLayout',
    components: {
      SidebarComponent,FooterComponent,HeaderComponent
    },
  }
</script>

