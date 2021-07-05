<template>
  <div>

    <header className="header">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <router-link class="navbar-brand" :to="{ name: 'Accueil' }">CM</router-link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul v-if="utilisateur" class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link class="nav-link active" aria-current="page" :to="{ name: 'Accueil' }">Accueil</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'Mon garage' }">Mon garage</router-link>
              </li>
            </ul>
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item dropdown">
                <router-link class="nav-link dropdown-toggle" :to="{name: 'Mon profile'}" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Utilisateur
                </router-link>
                <ul v-if="utilisateur" class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><router-link class="dropdown-item" :to="{name: 'Mon profile'}">Mon profile</router-link></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item" @click.prevent="deconnexion">Se déconnecter</a></li>
                </ul>
                <ul v-if="!utilisateur" class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><router-link class="dropdown-item" :to="{name: 'Créer un compte'}">S'inscrire</router-link></li>
                  <li><router-link class="dropdown-item" :to="{name: 'Se connecter'}">Se connecter</router-link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>

export default ({
  computed: {
    utilisateur() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    deconnexion() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/connexion');
    }
  }
})
</script>
