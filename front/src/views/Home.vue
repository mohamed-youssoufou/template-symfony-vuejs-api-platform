<template>
  <div>
      <nav-bar />
      <div>
        {{ todos }}
      </div>
  </div>
</template>

<script>
  import NavBar from '../components/NavBar.vue'
  import { mapGetters } from 'vuex';
  import api from '../API/todos'
  

export default {

  components: {
    NavBar
  },
  data : function(){
    return {
      todos : [],
      spinner : true,
    }
  },
  computed: {
    ...mapGetters('TodosModule', [
      'getTodos'
    ])
  },
  async mounted(){
    const res = await api.getTodos()
    this.$store.commit('TodosModule/SET_TODO', res.data)
    this.spinner = false
    this.todos = res.data
  }

}
</script>

<style>

</style>