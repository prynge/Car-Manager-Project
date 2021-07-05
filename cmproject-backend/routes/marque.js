const { authJwt } = require("../middleware");
const controller = require("../controllers/marqueController");

module.exports = (app, db) => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    '/marque',
    [authJwt.verifyToken],
    controller.newMarque
    )

  app.get(
    '/marques',
    [authJwt.verifyToken],
    controller.getAllMarques
    )

  app.get(
    '/marque/:id',
    [authJwt.verifyToken],
    controller.getOne
    )
}