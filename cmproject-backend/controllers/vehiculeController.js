const db = require('../models')
exports.newVehicule = async (req, res) => {
  await db.Vehicule.create({
    UtilisateurId: req.body.UtilisateurId,
    MarqueId: req.body.MarqueId,
    serie: req.body.serie,
  }).then((result) => res.json(result))
}

exports.updateVehicule = async (req, res) => {
  await db.Vehicule.findByPk(req.params.id)
  .then( (vehicule)=> {
    // Check if record exists in db
    if (vehicule) {
      vehicule.update({
        MarqueId: req.body.MarqueId,
        serie: req.body.serie,
      })
      .then( (result)=> {res.json(result)})
    }else{
      res.status(400).send('Hello.')}
  })
}

exports.getVehicules = async (req, res) => {
  await db.Vehicule.findAll(
    {attributes: ['id', 'serie', 'MarqueId', 'UtilisateurId']}
  ).then((result) => {
    return res.json(result)
  })
}

exports.getVehiculesByUtilisateur = async (req, res) => {
  await db.Vehicule.findAll({where: {UtilisateurId: req.params.utilisateur}},
    {attributes: ['id', 'serie', 'MarqueId', 'UtilisateurId']}
  ).then((result) => {
    return res.json(result)
  })
}

exports.getOne = async (req, res) => {
  await db.Vehicule.findByPk((req.params.id),
    {attributes: ['id', 'serie', 'MarqueId', 'UtilisateurId']}
  ).then((result) => {
    return res.json(result)
  })
}

exports.deleteVehicule =  async (req, res) => {
  await db.Vehicule.findByPk((req.params.id)
  ).then(async (result) => {
    await result.destroy();
  }).then(()=>{
    res.status(200)
  })
}
