module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Vehicules', 'MarqueId', {
      type: Sequelize.INTEGER,
      references: {
      model: 'Marques', // name of Target model
      key: 'id', // key in Target model that we're referencing
      },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
    })
  },
  
  down: (queryInterface) => {
          return queryInterface.removeColumn('Vehicules', 'MarqueId')
        }
  }