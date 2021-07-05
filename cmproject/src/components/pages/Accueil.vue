<template>
  <div class="body d-flex text-center text-white bg-dark">
    <div class="cover-container d-flex w-100 p-3 mx-auto flex-column align-item-center">
      <main class="px-3">
        <h1>Gérer votre garage.</h1>
        <p class="lead">Pellentesque sed magna ligula. Cras fringilla ac libero ut eleifend. Curabitur pharetra auctor tristique. Morbi porttitor tincidunt neque nec consequat.</p>
        <p class="lead">
          <router-link :to="{name: 'Créer un compte'}" class="btn btn-lg btn-secondary fw-bold border-white bg-white">Commencer maintenant</router-link>
        </p>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Accueil',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 /*
 * Globals
 */


/* Custom default button */
.btn-secondary,
.btn-secondary:hover,
.btn-secondary:focus {
  color: #333;
  text-shadow: none; /* Prevent inheritance from `body` */
}


/*
 * Base structure
 */

.body {
  text-shadow: 0 .05rem .1rem rgba(0, 0, 0, .5);
  box-shadow: inset 0 0 5rem rgba(0, 0, 0, .5);
  align-items: center;
  height: 95vh;
}

.cover-container {
  max-width: 42em;
}


/*
 * Header
 */

.nav-masthead .nav-link {
  padding: .25rem 0;
  font-weight: 700;
  color: rgba(255, 255, 255, .5);
  background-color: transparent;
  border-bottom: .25rem solid transparent;
}

.nav-masthead .nav-link:hover,
.nav-masthead .nav-link:focus {
  border-bottom-color: rgba(255, 255, 255, .25);
}

.nav-masthead .nav-link + .nav-link {
  margin-left: 1rem;
}

.nav-masthead .active {
  color: #fff;
  border-bottom-color: #fff;
}

</style>
