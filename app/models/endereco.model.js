module.exports = (sequelize, Sequelize) => {
    const Endereco = sequelize.define("endereco", {
      nomeEndereco: {
        type: Sequelize.STRING
      },
      cep: {
        type: Sequelize.STRING
      },
      logradouro: {
        type: Sequelize.STRING
      },
      numero: {
        type: Sequelize.STRING
      },
      bairro: {
        type: Sequelize.STRING
      },
      cidade: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.STRING
      },
      complemento: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Endereco;
  };