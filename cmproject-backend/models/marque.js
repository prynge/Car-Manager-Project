'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Marque extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Marque.init({
    nom: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Marque',
  });

  Marque.associate = (models) => {
    Marque.hasMany(models.Vehicule)
  }
  return Marque;
};