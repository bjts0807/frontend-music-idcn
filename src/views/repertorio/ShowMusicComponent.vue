<template>
    <div class="iq-card  iq-mb-3">
        <div class="iq-card-header d-flex justify-content-between">
           <div class="iq-header-title">
               <h5 class="card-title">Canción : <span class="text-primary">{{nombre_cancion}} )</span></h5>
           </div>
       </div>
       <div class="iq-card-body">
           <div class="iq-mb-3 ">
               <div class="card-header">
                   <i class="fa fa-list"></i> Detalles de la Canción <button class="btn btn-info" @click="getChord(1)">Subir tono</button>
               </div>
               <div class="iq-card-body">
                   <div class="row">
                       <div class="col-sm-6">
                           <div class="tab-content mt-0" id="v-pills-tabContent">
                               
                                   <ul>
                                       <li v-for="detalle in items" :key="detalle.id" class="d-flex mb-3 align-items-center p-3 sell-list border border-light rounded">
                                           <div class="user-img img-fluid">
                                               <i class="fa fa-list-alt fa-2x"></i>
                                           </div>
                                           <div class="media-support-info ml-3">
                                               <h6 class="text-primary text-uppercase">{{detalle.nombre}}</h6>
                                               <p class="mb-0 font-size-12 text-dark"> {{detalle.contenido}}</p>
                                               
                                           </div>
                                       </li>
                                   </ul>
                               
                           </div>
                       </div>
                  </div>
               </div>
           </div>
       </div>
   </div>
</template>
<script>
   import Swal from "sweetalert2";
import cancionService from "@/services/cancionService";
   export default {
       data(){
           return {
               id_music:'',
               nombre_cancion:'',
               items:[],
               transposedProgression:[],
           }
       },
       methods: {
           async show(){
               try {
                   this.LoaderSpinnerShow();

                   const response=await cancionService.show(this.id_music);

                   this.nombre_cancion=response.data.nombre;

                   this.items=response.data.detalles;

                   this.LoaderSpinnerHide();
               } catch (error) {
                   console.log(error);
                   this.LoaderSpinnerHide();
                   Swal.fire({
                       title: 'Oops!',
                       text: 'Ha ocurrido un error al procesar la solicitud',
                       icon: 'error',
                       confirmButtonColor: '#ff4545'
                   })
               }
           },
           async getChord(semitones){

               let arrayDetalle=[];

               this.items.forEach((e)=>{
                   const array = e.contenido.split(' ');
                   let detalles={
                       nombre:e.nombre,
                       contenido:array
                   }
                   arrayDetalle.push({...detalles});
               });

               console.log(arrayDetalle);

               arrayDetalle.forEach((det)=>{
                    const transposedChords = det.contenido.map((chord) => {
                       const chordInfo = this.getChordInfo(chord);
                       console.log(chordInfo);
                       if (chordInfo) {
                           const index = chordInfo.index;
                           const isMajor = chordInfo.type ==='major';
                           const isMinor = chordInfo.type === 'minor';
                           const newIndex = (index + semitones) % 12;
                           const newChord = this.getChordByIndex(newIndex);
                           if (isMajor) {
                               return newChord;
                           } else if (isMinor) {
                               return newChord + 'm';
                           } else {
                               return chord;
                           }
                       }
                       return chord;
                   }); 
                   let newDetalles={
                       nombre:det.nombre,
                       contenido:transposedChords
                   }
                   this.items.push(newDetalles);
               })
           },
           getChordInfo(chord) {
               const chordRegex = /^([A-G][b#]?)(m|M)?/;
               const matches = chord.match(chordRegex);
               if (matches) {
                   const name = matches[1];
                   const type = matches[2] === 'm' ? 'minor' : 'major';
                   const index = this.getChordIndex(name);
                   return {
                       name,
                       type,
                       index,
                   };
               }
               return null;
           },
           getChordIndex(chord) {
               const chords = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
               return chords.indexOf(chord);
           },
           getChordByIndex(index) {
               const chords = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
               return chords[index];
           }
       },
       async created(){
           this.id_music=this.$route.params.id_music;
          await this.show();
       }
   }
</script>