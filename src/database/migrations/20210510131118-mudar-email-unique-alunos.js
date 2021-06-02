module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('alunos', 'email', {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    });
  },

  down: async () => {},
};
