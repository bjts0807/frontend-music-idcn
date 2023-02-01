<template>
<div>
   <!-- Sign in Start -->
      <section class="sign-in-page">
       
        <div class="container">
            <div class="row justify-content-center align-items-center height-self-center">
               <div class="col-md-6 col-sm-12 col-12 align-self-center">
                  <div class="sign-user_card ">
                     <div class="d-flex justify-content-center">
                        <div class="sign-user_logo">
                           <img src="../assets/logo.png" class=" img-fluid" alt="Logo">
                        </div>
                     </div>
                     <div class="sign-in-page-data">
                        <div class="sign-in-from w-100 pt-5 m-auto">
                           <h1 class="mb-3 text-center">Sign in</h1>
                            <div class="form-group" v-if="has_error">
          <div class="alert alert-danger alert-dismissible fade show w-100 d-block" role="alert">
            <div ><i class="fas fa-exclamation-triangle fa-fw"></i> {{message}}</div>
          </div>
        </div>
                           <form @submit.prevent="login()" class="mt-4">
                              <div class="form-group">
                                  <input type="email" class="form-control mb-0" v-model="form.email" id="floatingInput" placeholder="Email address / Username" />
                <label for="floatingInput">Email</label>
                <div v-if="v$.form.email.$error" class="text-danger" style="font-size:14px" >
                  <i class="fa fa-warning fa-fw"></i> Por favor ingrese su email.
                </div>
                              </div>
                              <div class="form-group">
                                <input type="password" class="form-control mb-0" v-model="form.password" id="floatingInput" placeholder="Password" />
                <label for="floatingInput">Contraseña</label>
                <div v-if="v$.form.password.$error" class="text-danger" style="font-size:14px" >
                  <i class="fa fa-warning fa-fw"></i> Por favor ingrese su contraseña.
                </div>
                              </div>
                              <div class="sign-info">
                                 <button type="submit" class="btn btn-primary mb-2">Acceder</button>
                                 
                              </div>
                              
                           </form>
                        </div>
                     </div>
                     <div class="mt-2">
                        <div class="d-flex justify-content-center links">
                           Power By <a href="sign-up.html" class="ml-2">Brayan Torres</a>
                        </div>
                        <div class="d-flex justify-content-center links">
                          MAOE Versión 1.0
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <!-- Sign in END -->
            <!-- color-customizer -->
         </div>
      </section>
      
      </div>
 
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required ,email} from '@vuelidate/validators';
import {useRouter} from "vue-router";

export default {
  name: "LoginComponent",
  setup: () => ({ v$: useVuelidate() }),
  data (){
    return {
      form: {
        email: "bjts95@gmail.com",
        password: "123456",
      },
      has_error : false,
      message : "",
    }
  },

  validations(){
    return {
      form: {
          email: { required, email },
          password: { required },
      }
    }
  },
  methods: {
    async login() {
      const router = useRouter();
      try{
        if (!await this.v$.form.$validate()) return;

        this.LoaderSpinnerShow();

        await this.$store.dispatch("login", this.form);

        await router.push({ name : 'Dashboard' });

        this.LoaderSpinnerHide();
      }catch(error){
        this.LoaderSpinnerHide();
        switch(error.status){
          case 422:
            this.has_error = true;
            this.message = "Usuario o contraseña incorrectos";
          break;
          case 401:
            this.has_error = true;
            this.message = "Usuario o contraseña incorrectos";
          break;
          default :
            this.has_error = true;
            this.message = "Ha ocurrido un error, por favor intente nuevamente";
          break;
        }
      }
    }
  },
};
</script>