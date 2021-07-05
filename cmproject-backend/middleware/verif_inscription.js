const db = require("../models");
const Utilisateur = db.Utilisateur;

checkDuplicateEmail = (req, res, next) => {
  Utilisateur.findOne({
    where: {
        email: req.body.email
      }
    }).then(utilisateur => {
      if (utilisateur) {
        res.status(400).send({
          message: "Echec! Email est déjà utilisé!"
        });
        return;
      }

      next();
    });
};

const verifInscription = {
  checkDuplicateEmail: checkDuplicateEmail
};

module.exports = verifInscription;