const db = require('../models')
exports.newUtilisateur = async (req, res) => {
  await db.Utilisateur.create({
    email: req.body.email,
    motdepasse: req.body.motdepasse,
  }).then((result) => res.json(result))
}

exports.updateUtilisateur = async (req, res) => {
  await db.Utilisateur.findByPk(req.params.id)
  .then((utilisateur)=> {
    // Check if record exists in db
    if (utilisateur) {
      utilisateur.update({
        email: req.body.email,
        motdepasse: req.body.motdepasse,
      })
      .then((result)=> {res.json(result)})
    }else{
      res.status(400).send('Hello.')}
  })
}

exports.getUtilisateurs = async (req, res) => {
  await db.Utilisateur.findAll(
    {attributes: ['id', 'email', 'motdepasse']}
  ).then((result) => {
    return res.json(result)
  })
}

exports.getOne =  async (req, res) => {
  await db.Utilisateur.findByPk((req.params.id),
    {attributes: ['id', 'email', 'motdepasse']}
  ).then((result) => {
    return res.json(result)
  })
}


//Only for admin purpose
exports.deleteUtilisateur =  async (req, res) => {
  await db.Utilisateur.findByPk((req.params.id)
  ).then(async (result) => {
    await result.destroy();
  }).then(()=>{
    res.status(200)
  })
}
