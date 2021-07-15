const db = require("../models");
const Cliente = db.cliente;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.cpfCliente) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Tutorial
    const cliente = {
      nomeCliente: req.body.nome,
      cpfCliente: req.body.cpf,
      dataNasimentoCliente: req.body.dataNasimentoCliente,
      published: req.body.published ? req.body.published : false
    };
  
    // Save Tutorial in the database
    Cliente.create(cliente)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocorrreu um erro na criação do novo cliente"
        });
      });
  };

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const id = req.query.cpfCliente;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Cliente.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Um erro ocorreu ao buscar todos  os clientes"
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.cpfCliente;

  Tutorial.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.cpfCliente;

  Tutorial.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "id do cliente foi atualizado com sucesso"
        });
      } else {
        res.send({
          message: `nao foi possivel atualizar o nome. talvez tenha sido escrito errado ou o valor esteja vazio`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "erro ao atualizar o nome" + nome
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.cpfCliente;

  Tutorial.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "cliente was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete cliente with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete cliente with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Cliente.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Cliente.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ocorreu um erro durante a apresentação de todos os clientes"
      });
    });
};