const db = require("../models");
const Endereco = db.endereco;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nome) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Tutorial
    const endereco = {
      nomeEndereco: req.body.nome,
      cep: req.body.cep,
      logradouro: req.body.logradouro,
      numero: req.body.numero,
      bairro: req.body.bairro,
      cidade: req.body.cidade,
      estado: req.body.estado,
      complemento: req.body.complemento,
      published: req.body.published ? req.body.published : false
    };
  
    // Save Tutorial in the database
    Endereco.create(endereco)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the endereco."
        });
      });
  };

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const nome = req.query.nomeEndereco;
  var condition = nome ? { nome: { [Op.like]: `%${nome}%` } } : null;

  Endereco.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving enderecos."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.nomeEndereco;

  Endereco.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with nome=" + id
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.nomeEndereco;

  Endereco.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "endereco was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update endereco with nome=${id}. Maybe endereco was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating endereco with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.nomeEndereco;

  Tutorial.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "endereco was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete endereco with nome=${id}. Maybe endereco was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete endereco with nome=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Endereco.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} enderecos were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all enderecos."
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Endereco.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving enderecos."
      });
    });
};