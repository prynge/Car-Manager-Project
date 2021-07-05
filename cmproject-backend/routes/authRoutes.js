const { verifInscription } = require("../middleware");
const controller = require("../controllers/authController");

module.exports = function(app,db) {
  

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/auth/inscription",
    [
      verifInscription.checkDuplicateEmail
    ],
    controller.signup
  );

  app.post("/auth/connexion", controller.signin);
};