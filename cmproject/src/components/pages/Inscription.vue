<template>
  <div class="container-fluid row">
    <div class="col-8" style="background-image:url(https://source.unsplash.com/random);background-repeat: no-repeat;background-position: center;background-size: cover;">
    </div>
    <div class="col-4" >
      <div class="container p-5 d-flex flex-column justify-content-between" style="height:94vh;">
        <h1>CarManager</h1>
        <div>
          <Form class="text-start" @submit="handleRegister" :validation-schema="schema">
            <div class="form-group">
              <label>Email</label>
              <Field name="email" type="email" class="form-control"  placeholder="Entrez votre email"/>
              <ErrorMessage name="email" class="error-feedback" />
            </div><!-- form-group -->
            <div class="form-group">
              <label>Mot de passe</label>
              <Field name="motdepasse" type="password" class="form-control" placeholder="Entrez votre mot de passe" />
              <ErrorMessage name="motdepasse" class="error-feedback" />
            </div><!-- form-group -->
            <button class="btn btn-primary mt-5 d-grid col-6 mx-auto" :disabled="loading">Créer un compte</button>
          </Form>
          <div
            v-if="message"
            class="alert"
            :class="successful ? 'alert-success' : 'alert-danger'"
          >
            {{ message }}
          </div>
        </div>
        <div>
          <p>Vous avez déjà un compte ? <router-link :to="{name:'Se connecter'}">Connectez-vous</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: 'Inscription',
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      email: yup
        .string()
        .required("Email est requis!")
        .email("Email est invalide!"),
      motdepasse: yup
        .string()
        .required("Mot de passe est requis!")
        .min(6, "Doit avoir au moins 6 charactères!")
        .max(40, "Doit avoir 40 charactères au maximum!"),
    });

    return {
      successful: false,
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
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      this.$store.dispatch("auth/inscription", user).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
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
