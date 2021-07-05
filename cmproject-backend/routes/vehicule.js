const { authJwt } = require("../middleware");
const controller = require("../controllers/vehiculeController");

module.exports = (app, db) => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    '/vehicule',
    [authJwt.verifyToken],
    controller.newVehicule
    )

  app.put(
    '/vehicule/:id',
    [authJwt.verifyToken],
    controller.updateVehicule
    )

  app.get(
    '/vehicules',
    [authJwt.verifyToken],
    controller.getVehicules
    )
    
    app.get(
      '/vehicules/utilisateur/:utilisateur', 
      [authJwt.verifyToken],
      controller.getVehiculesByUtilisateur
      )
  
  app.get(
    '/vehicule/:id', 
    [authJwt.verifyToken],
    controller.getOne
    )

  app.delete(
    '/vehicule/:id',
    [authJwt.verifyToken],
    controller.deleteVehicule
    )
}