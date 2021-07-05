const db = require('../models')
exports.newMarque =  async (req, res) => {
  await db.Marque.create({
    nom: req.body.nom,
  }).then((result) => res.json(result))
}

exports.getOne = async (req, res) => {
  await db.Marque.findByPk((req.params.id),
    {attributes: ['id', 'nom']}
  ).then((result) => {
    return res.json(result)
  })
}

exports.getAllMarques = async (req, res) => {
  await db.Marque.findAll(
    {attributes: ['id', 'nom']}
  ).then((result) => {
    return res.json(result)
  })
}
