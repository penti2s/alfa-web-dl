<template>
  <v-container>
    <h1 align="center"> Lista de Cursos </h1>
    <div >
      <Card :data="this.class" tittle='JavaScript Basico de 0 a 100'/>
    </div>
  </v-container>

</template>

<script>
  import {  mapActions, mapState } from 'vuex'
  import Card from '@/components/Card.vue'


  export default {
    name: 'Home-view',
    components: {
      Card,
    },
    computed: {
      ...mapState(['class']),
    },
    methods: {
      ...mapActions(['fetchClass']),
    },
    created(){
      this.fetchClass()
    }
  }
</script>
