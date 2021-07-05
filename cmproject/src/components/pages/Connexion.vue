<template>
  <div class="container-fluid row">
    <div class="col-8" style="background-image:url(https://source.unsplash.com/random);background-repeat: no-repeat;background-position: center;background-size: cover;">
    </div>
    <div class="col-4" >
      <div class="container p-5 d-flex flex-column justify-content-between" style="height:94vh;">
        <h1>CarManager</h1>
        <div>
          <Form class="text-start" @submit="handleLogin" :validation-schema="schema">
            <div class="form-group">
              <label>Email</label>
              <Field name="email" type="email" class="form-control"   placeholder="Entrez votre email"/>
              <ErrorMessage name="email" class="error-feedback" />
            </div><!-- form-group -->
            <div class="form-group">
              <label>Mot de passe</label>
              <Field name="motdepasse" type="password" class="form-control"  placeholder="Entrez votre mot de passe" />
              <ErrorMessage name="motdepasse" class="error-feedback" />
            </div><!-- form-group -->
            <button class="btn btn-primary mt-5 d-grid col-6 mx-auto" :disabled="loading">Se connecter</button>
            <div class="form-group">
              <div v-if="message" class="alert alert-danger" role="alert">
                {{ message }}
              </div>
            </div>
          </Form>
        </div>
        <div>
          <p>Vous n'avez pas de compte ? <router-link :to="{name:'Créer un compte'}">Inscrivez-vous</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: 'Connexion',
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data () {
    const schema = yup.object().shape({
      email: yup.string().required("Email est requis!"),
      motdepasse: yup.string().required("Mot de passe est requis!"),
    });

    return {
      loading: false,
      message: "",
      schema,
    };
  },
  
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;

      this.$store.dispatch("auth/connexion", user).then(
        () => {
          this.$router.push("/profile");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
