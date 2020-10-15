<template>
  <div>
      <nav-bar />
      <spinner class="loader" v-if="spinner"></spinner>
      <div class="container">
        <div class="row mt-3">
          <div class="col-lg-12">
            <Chart class="chart_zone" :chart-data="datacollection"/>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-lg-2 pt-2">
              <h3>Rechercher Par</h3>
          </div>
          <div class="col-lg-2">
            <input class="form-control" type="text" v-model="searchTitle" placeholder="titre">
          </div>
          <div class="col-lg-2">
            <date-picker v-model="date1" valueType="format" ></date-picker>
          </div>
          <div class="col-lg-2">
            <date-picker v-model="date2" valueType="format" :default-value="new Date()"></date-picker>
          </div>
          <div class="col-lg-2">
            <button class="btn btn-primary" @click="searchByTwoDates">Chercher</button>
          </div>
        </div>
        <div class="row" v-if="pageOfItems.length">
          <div class="col-lg-12">
            <p>Nombre d'élement(s) trouvé(s) <strong>{{ todos.length }}</strong></p>
          </div>
        </div>
        <table id="news-table" class="table tablesorter mb-5">
          <thead class="cf">
            <tr>
              <th scope="col" class="header">USER ID</th>
              <th scope="col" class="header">ID</th>
              <th scope="col" class="header">title</th>
              <th scope="col" class="header">date</th>
              <th scope="col" class="header">completed</th>
              <td>actions</td>
            </tr>
          </thead>
          <tbody v-if="pageOfItems.length">
            <tr v-for="todo in pageOfItems" :key="todo.id">
              <td class="align-middle">{{todo.userId}}</td>
              <td class="align-middle">{{todo.id}}</td>
              <td class="align-middle">{{todo.title}}</td>
              <td class="align-middle">{{todo.date}}</td>
              <td class="align-middle">{{todo.completed}}</td>
              <td class="align-middle">
                <router-link :to="{ name: 'detail', params: { id: todo.id }}" class="btn btn-sm btn-primary">+</router-link>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr style="border-bottom: none">aucun element trouvé</tr>
          </tbody>
        </table>
        <div class="card-footer pb-0 pt-1">
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
  import DatePicker from 'vue2-datepicker';
  import Chart from '../components/Chart.vue'

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
      Spinner,
      DatePicker,
      Chart
    },
    data : function(){
      return {
        todos : [],
        todosFilter: [],
        spinner : true,
        pageOfItems: [],
        customLabels,
        searchTitle : "",
        date1: null,
        date2: null,
        datacollection: {}
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
        },
        searchByTwoDates: function(){
          
          this.todos = this.todosFilter.filter(todo => {


            let dateDiffWithDate1 = this.getTimeDiff(todo.date, this.date1)
            let dateDiffWithDate2 = this.getTimeDiff(this.date2, todo.date)

            if(
              (dateDiffWithDate1 > 0 && dateDiffWithDate2 > 0)
              || (dateDiffWithDate1 == 0 || dateDiffWithDate2 == 0)
            ){
              return todo
            }

          })
      },
      getTimeDiff: (time1, time2) => {
        console.log(`${time1} - ${time2}`)
        return new Date(time1).getTime() - new Date(time2).getTime()
      }
    },
    async created(){
      const res = await api.getTodos()
      this.$store.commit('TodosModule/SET_TODO', res.data)
      this.spinner = false
      //test add date to todo
      this.todos = res.data
      let newTodo = []
      this.todos.forEach(todo => {
        todo.date = `2020-9-${Math.floor(Math.random() * (30 - 1 + 1)) + 1}`
        newTodo.push(todo)
      });
      this.todos = newTodo
      //fin test
      //this.todos = res.data
      this.todosFilter = this.todos
      // chart js loading 

    },
    beforeMount() {
      this.datacollection = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45]
          },
                    {
            label: 'Second data',
            backgroundColor: 'rgb(255, 0, 0)',
            borderColor: 'rgb(25, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45].reverse()
          }
        ]
      }
    }
  }
</script>

<style>

</style>