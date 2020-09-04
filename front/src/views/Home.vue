<template>
  <div>
      <button type="button" class="btn btn-primary">Primary</button>
  </div>
</template>

<script>
export default {
  mounted: function(){
    //test axios
    this.axios.get('/users')
              .then((res) => {
                console.log(res.data)
              })
              .catch((error) => {
                console.log(error)
              })
  }
}
</script>

<style>

</style>