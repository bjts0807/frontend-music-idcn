<template>
  <v-select
    label="text"
    :options="miembros"
    v-model="selected"
    :reduce="miembro => mode === 'object' ? miembro : miembro.id"
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
import memberService from "./../../services/memberService";

export default {
  props: ["value", "mode", "validator"],
  components : {VSelect},
  data() {
    return {
      miembros: [],
      selected: this.value,
      search: "",
    };
  },
  created() {
    this.debounceSearch = debounce(this.buscarMiembro, 300);
  },
  watch: {
    value: {
      handler: function (newValue) {
        if (newValue !== null || newValue !== undefined) {

          if (this.mode === "object") {

            let find = this.miembros.find(x=> x.id === newValue.id);

            if(find !== undefined && find !== null){
                this.selected = newValue;
                return;
            }

            memberService.getMemberByName(newValue.id)
              .then((response) => {
                let miembro = {
                  id: response.data.id,
                  text: `${response.data.first_name} ${response.data.second_name} ${response.data.first_surname} ${response.data.second_surname}`,
                };
                this.miembros.push(miembro);
                this.selected = miembro;
              })
              .catch((error) => {
                console.error(error);
              });
          } else {

            let find = this.miembros.find(x=> x.id === newValue);

            if(find !== undefined && find !== null){
                this.selected = newValue;
                return;
            }

            memberService.getMemberByName(newValue)
              .then((response) => {
                let miembro = {
                  id: response.data.id,
                  text: `${response.data.first_name} ${response.data.second_name} ${response.data.first_surname} ${response.data.second_surname}`,
                };
                this.miembros.push(miembro);
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
    async buscarMiembro(search, loading) {
      if (search === "") {
        return;
      }
      try {
        loading(true);
        const response = await memberService.dataSource(`?s=${escape(search)}`);
        this.miembros = response.data.results;
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
