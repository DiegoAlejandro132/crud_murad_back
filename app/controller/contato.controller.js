const db = require("../models")
const Contato = db.contato
const Op = db.Sequelize.Op

// Create and Save a new Contato
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nome) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
    return
  }

  // Create a Contato
  const contato = {
    nomeContato: req.body.nome,
    contato: req.body.contato,
    tipo: req.body.tipo,
    published: req.body.published ? req.body.published : false
  }

  // Save Contato in the database
  Contato.create(contato)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro na criação do contato"
      })
    })
}

// Retrieve all Contatos from the database.
exports.findAll = (req, res) => {
  const search = req.query.search
  var condition = search ? { [Op.or]: [{ nomeContato: { [Op.like]: `%${search}%` } }, { contato: { [Op.like]: `%${search}%` } }] } : null

  Contato.findAll({ where: condition })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro durante a seleção de todos os contatos"
      })
    })
}

// Find a single Contato with an id
exports.findOne = (req, res) => {
  const id = req.params.id
  console.log(id)

  Contato.findByPk(id)
    .then(data => {
      console.log(data)
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: "erro ao achar contato, " + id
      })
    })
}

// Update a Contato by the id in the request
exports.update = (req, res) => {
  const id = req.params.id

  Contato.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "contato foi atualizado com sucesso "
        })
      } else {
        res.send({
          message: `nao foi possivel atualizar o contato ${id}`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "erro ao tentar atualizar contato " + id
      })
    })
}

// Delete a Contato with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id

  Contato.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "contato foi excluido com sucesso"
        })
      } else {
        res.send({
          message: `nao foi possivel excluir contato ${id}. talvez nao tenha sido achado`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "nao foi possivel deleter o contato " + id
      })
    })
}

// Delete all Contatos from the database.
exports.deleteAll = (req, res) => {
  Contato.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} contatos were deleted successfully!` })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all contatos."
      })
    })
}

// Find all published Contatos
exports.findAllPublished = (req, res) => {
  Contato.findAll({ where: { published: true } })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      })
    })
}