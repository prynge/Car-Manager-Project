const express = require('express')
const bodyParser = require('body-parser')
const db = require('./models')
const authRoutes = require('./routes/authRoutes')
const marqueRoutes = require('./routes/marque')
const vehiculeRoutes = require('./routes/vehicule')
const utilisateurRoutes = require('./routes/utilisateur')
const cors = require("cors");

let corsOptions = {
  origin: "http://localhost:8081"
};


const app = express()

app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
db.sequelize.sync();

app.get('/', (req, res) => {
  res.status(200).send('Hello.')
})

app.use(express.static('app/public'))

// routess
authRoutes(app, db)
marqueRoutes(app, db)
vehiculeRoutes(app, db)
utilisateurRoutes(app, db)

module.exports = app