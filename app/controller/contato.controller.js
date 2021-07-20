const db = require("../models");
const Contato = db.contato;
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
    const contato = {
      nomeContato: req.body.nome,
      contato: req.body.contato,
      tipo: req.body.tipo,
      published: req.body.published ? req.body.published : false
    };
  
    // Save Tutorial in the database
    Contato.create(contato)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocorreu um erro na criação do contato"
        });
      });
  };

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const nome = req.query.nomeContato;
  var condition = nome ? { nome: { [Op.like]: `%${nome}%` } } : null;

  Tutorial.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro durante a seleção de todos os contatos"
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.nomeContato;

  Tutorial.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "erro ao achar contato, " + id
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.nomeContato;

  Tutorial.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "contato foi atualizado com sucesso "
        });
      } else {
        res.send({
          message: `nao foi possivel atualizar o contato ${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "erro ao tentar atualiar contato " + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.nomeContato;

  Tutorial.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "contato foi excluido com sucesso"
        });
      } else {
        res.send({
          message: `nao foi possivel excluir contato ${id}. talvez nao tenha sido achado`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "nao foi possivel deleter o contato " + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Contato.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} contatos were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all contatos."
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Contato.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};