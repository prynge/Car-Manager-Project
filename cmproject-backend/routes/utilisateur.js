const { authJwt } = require("../middleware");
const controller = require("../controllers/utilisateurController");

module.exports = (app, db) => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    '/utilisateur',
    [authJwt.verifyToken],
    controller.newUtilisateur
    )

  app.put(
    '/utilisateur/:id',
    [authJwt.verifyToken],
    controller.updateUtilisateur
    )

  app.get(
    '/utilisateurs',
    [authJwt.verifyToken],
    controller.getUtilisateurs
    )
  
  app.get(
    '/utilisateur/:id',
    [authJwt.verifyToken],
    controller.getOne
    )

}