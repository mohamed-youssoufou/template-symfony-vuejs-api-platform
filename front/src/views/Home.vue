<template>
  <div>
      <nav-bar />
      <spinner class="loader" v-if="spinner"></spinner>
      <div class="container">
        <div class="row mt-3">
          <div class="col-lg-2">
              Rechercher Par
          </div>
          <div class="col-lg-2">
            <input class="form-control" type="text" v-model="searchTitle" placeholder="titre">
          </div>
        </div>
        <table id="news-table" class="table tablesorter mb-5">
          <thead class="cf">
            <tr>
              <th scope="col" class="header">USER ID</th>
              <th scope="col" class="header">ID</th>
              <th scope="col" class="header">title</th>
              <th scope="col" class="header">completed</th>
              <td>actions</td>
            </tr>
          </thead>
          <tbody v-if="pageOfItems.length">
            <tr v-for="todo in pageOfItems" :key="todo.index">
              <td class="align-middle">{{todo.userId}}</td>
              <td class="align-middle">{{todo.id}}</td>
              <td class="align-middle">{{todo.title}}</td>
              <td class="align-middle">{{todo.completed}}</td>
              <td class="align-middle">
                <router-link to="/" class="btn btn-sm btn-primary">+</router-link>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr style="border-bottom: none">aucun element trouvé</tr>
          </tbody>
      </table>
      <div class="card-footer pb-0 pt-3">
            <jw-pagination :items="todos" @changePage="onChangePage" :labels="customLabels"></jw-pagination>
        </div>
      </div>
  </div>
</template>

<script>
  import NavBar from '../components/NavBar.vue'
  import { mapGetters } from 'vuex'
  import api from '../API/todos'
  import Pagination from '../components/Paginator.vue'
  import Spinner from '../components/spinners/Spinner.vue'
import todos from '../API/todos'

  const customLabels = {
    first: '',
    last: '',
    previous: 'Precedent',
    next: 'Suivant'
  };

  export default {

    components: {
      NavBar,
      Pagination,
      Spinner
    },
    data : function(){
      return {
        todos : [],
        todosFilter: [],
        spinner : true,
        pageOfItems: [],
        customLabels,
        searchTitle : ""
      }
    },
    computed: {
      ...mapGetters('TodosModule', [
        'getTodos'
      ])
    },
    watch: {
      searchTitle: function (value) {
        //Vue._.debounce
        this.todos = this.todosFilter.filter(todo => {
          return todo.title.includes(value)
        })
      }
    },
    methods : {
      onChangePage(pageOfItems) {
          this.pageOfItems = pageOfItems;
        }
    },
    async mounted(){
      const res = await api.getTodos()
      this.$store.commit('TodosModule/SET_TODO', res.data)
      this.spinner = false
      this.todos = res.data
      this.todosFilter = this.todos
    }
  }
</script>

<style>

</style>