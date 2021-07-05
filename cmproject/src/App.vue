<template>
  <div>
    <AppTopBar/>
    <router-view/>
    <AppFooter/>
  </div>
</template>

<script>
import AppTopBar from './components/AppNavbar.vue'
import AppFooter from './components/AppFooter.vue'


export default {
  name: 'App',
  components: {
    'AppTopBar': AppTopBar,
    'AppFooter': AppFooter
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
