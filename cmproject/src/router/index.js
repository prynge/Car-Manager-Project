import { createWebHistory, createRouter } from "vue-router";
import Accueil from '@/components/pages/Accueil'
import Inscription from '@/components/pages/Inscription'
import Connexion from '@/components/pages/Connexion'
import Profile from '@/components/pages/Profile'
import Garage from '@/components/pages/Garage'
import NotFound from '@/components/pages/NotFound'
import HelloWorld from '@/components/pages/HelloWorld'


const routes= [
  {
    path: '/',
    name: 'Accueil',
    component: Accueil
  },
  {
    path: '/inscription',
    name: 'Créer un compte',
    component: Inscription
  },
  {
    path: '/connexion',
    name: 'Se connecter',
    component: Connexion
  },
  {
    path: '/profile',
    name: 'Mon profile',
    component: Profile
  },
  {
    path: '/garage',
    name: 'Mon garage',
    component: Garage
  },
  {
    path: '/quitter',
    name: 'Se déconnecter',
    component: Connexion
  },
  {
    path: '/hello',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/inscription', '/connexion', '/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    next('/connexion');
  } else {
    next();
  }
});

export default router;