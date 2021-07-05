# cmproject

Choix technologiques : VueJs, NodeJs, MySQL (et autre package npm de votre choix, si vous le souhaitez).

Sujet : Vous devez réaliser une application contenant un back-office sous forme d’API via un server en NodeJs, et d'un front en VueJs communiquant alors avec votre API afin d’y récupérer les informations. 

Contexte : Une personne souhaite se connecter à son espace d’administration sur lequel elle peut ajouter des véhicules à son garage virtuelle. Une fois la personne connectée elle pourra alors ajouter / modifier / supprimer des véhicules de son garage.
Si la personne n’a pas encore de compte, elle peut alors en créer un, juste avec un email et un mot de passe afin de se connecter par la suite. Pour résumer, un utilisateur à un email, un mot de passe (afin de se connecter), et des véhicules.
Les données d’un véhicule importent peu : une marque, et un numéro de série sont suffisants.

Les routes obligatoires sont les suivantes : 

POST UTILISATEUR (email/mot de passe)
GET UTILISATEUR
PUT UTILISATEUR

POST VÉHICULE (marque/numéro de série)
GET VÉHICULE
PUT VÉHICULE
DELETE VÉHICULE

Base de données :
Les données seront stockées sous MySQL.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
