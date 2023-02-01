<template>
  <v-select
    label="text"
    :options="artistas"
    v-model="selected"
    :reduce="artista => mode === 'object' ? artista : artista.id"
    @search="debounceSearch"
    @input="setChange"
    :class="classObject"
  >
    <template #no-options="{ search }">
      No se encontraron resultados para <strong>{{ search }}</strong>
    </template>
    <template #search="{ attributes, events }">
      <input class="vs__search" v-bind="attributes" v-on="events" />
    </template>
  </v-select>
</template>

<script>
import {debounce} from 'lodash';
import VSelect  from "vue-select";
//import VSelect from 'vue-select';
import artistaService from "./../../services/artistaService";

export default {
  props: ["value", "mode", "validator"],
  components : {VSelect},
  data() {
    return {
      artistas: [],
      selected: this.value,
      search: "",
    };
  },
  created() {
    this.debounceSearch = debounce(this.buscarArtista, 300);
  },
  watch: {
    value: {
      handler: function (newValue) {
        if (newValue !== null || newValue !== undefined) {

          if (this.mode === "object") {

            let find = this.artistas.find(x=> x.id === newValue.id);

            if(find !== undefined && find !== null){
                this.selected = newValue;
                return;
            }

            artistaService.getArtistaByName(newValue.id)
              .then((response) => {
                let artista = {
                  id: response.data.id,
                  text: `${response.data.nombre}`,
                };
                this.artistas.push(artista);
                this.selected = artista;
              })
              .catch((error) => {
                console.error(error);
              });
          } else {

            let find = this.artistas.find(x=> x.id === newValue);

            if(find !== undefined && find !== null){
                this.selected = newValue;
                return;
            }

            artistaService.getArtistaByName(newValue)
              .then((response) => {
                let artista = {
                  id: response.data.id,
                  text: `${response.data.nombre}`,
                };
                this.artistas.push(artista);
                this.selected = newValue;
              })
              .catch((error) => {
                console.error(error);
              });
          }
        }
      },
      deep: true,
    },
  },
  methods: {
    async buscarArtista(search, loading) {
      if (search === "") {
        return;
      }
      try {
        loading(true);
        const response = await artistaService.dataSource(`?s=${escape(search)}`);
        this.artistas = response.data.results;
        loading(false);
      } catch (error) {
        loading(false);
        alert("Ocurrio un error, por favor intente nuevamente");
      }
    
    },
    setChange(value) {
      this.$emit("input", value);
      this.$emit("update-value", value);
    },

  },
  computed: {
      classObject: function () {

          if (this.validator === undefined || this.validator === null) {
              return "";
          }

          return this.validator.$error ? "v-select-error is-invalid" : "is-valid";
      }
  },
};
</script>
