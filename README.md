# CMPROJECT 
## Enoncé
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

## Pré requis
Pour le bon fonctionnement de l'application veuillez garder ou mettre à jour les variables d'environnements dans le fichier .env de cmproject-backend.

./cmproject-backend/.env


## Scripts

### Installation du projet
```
npm install
```

#### Lancer le projet
```
npm start
```

###### Note

Il est possible de lancer chacune des parties du projet individuellement. <br>
Pour le front-end 
```
cd ./cmproject/
npm install
npm run serve
```

Pour le back-end 
```
cd ./cmproject-backend/
npm install
node server
```