<template>
  <v-select
    label="text"
    :options="members"
    v-model="selected"
    :reduce="member => mode === 'object' ? member : member.id"
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
import VSelect from 'vue-select';
import membersService from "./../../services/membersService";

export default {
  props: ["value", "mode", "validator"],
  components : {VSelect},
  data() {
    return {
      members: [],
      selected: this.value,
      search: "",
    };
  },
  created() {
    this.debounceSearch = debounce(this.buscarMember, 300);
  },
  watch: {
    value: {
      handler: function (newValue) {
        if (newValue !== null || newValue !== undefined) {

          if (this.mode === "object") {

            let find = this.members.find(x=> x.id === newValue.id);

            if(find !== undefined && find !== null){
                this.selected = newValue;
                return;
            }

            membersService.getMemberByName(newValue.id)
              .then((response) => {
                let member = {
                  ID: response.data.id,
                  text: `${response.data.first_name} ${response.data.second_name} ${response.data.first_surname} ${response.data.second_surname}`,
                };
                this.members.push(member);
                this.selected = member;
              })
              .catch((error) => {
                console.error(error);
              });
          } else {

            let find = this.members.find(x=> x.id === newValue);

            if(find !== undefined && find !== null){
                this.selected = newValue;
                return;
            }

            membersService.getMemberByName(newValue)
              .then((response) => {
                let member = {
                  ID: response.data.id,
                  text: `${response.data.first_name} ${response.data.second_name} ${response.data.first_surname} ${response.data.second_surname}`,
                };
                this.members.push(member);
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
    async buscarMember(search, loading) {
      if (search === "") {
        return;
      }
      try {
        loading(true);
        const response = await membersService.dataSource(`?s=${escape(search)}`);
        this.members = response.data.results;
        loading(false);
      } catch (error) {
        loading(false);
        alert("Ocurrio un error, por favor intente nuevamente");
      }
      
     
      /* Axios.get(`${this.data_sources_member.member}?s=${escape(search)}`)
        .then((response) => {
          this.members = response.data.results;
          loading(false);
        })
        .catch(() => {
          
        }); */
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
