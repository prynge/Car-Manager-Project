const db = require("../models");
const config = require("../config/authConfig");
const Utilisateur = db.Utilisateur;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save Utilisateur to Database
  Utilisateur.create({
    email: req.body.email,
    motdepasse: bcrypt.hashSync(req.body.motdepasse, 8)
  })
    .then((utilisateur) => {
      res.send({ message: "Utilisateur enregistré!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  Utilisateur.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(utilisateur => {
      if (!utilisateur) {
        return res.status(404).send({ message: "Utilisateur introuvable." });
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.motdepasse,
        utilisateur.motdepasse
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Mot de passe invalide!"
        });
      }

      let token = jwt.sign({ id: utilisateur.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      
      res.status(200).send({
        id: utilisateur.id,
        email: utilisateur.email,
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};