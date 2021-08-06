const db = require("../models")
const Cliente = db.cliente
const Op = db.Sequelize.Op

// Create and Save a new Cliente
exports.create = (req, res) => {
  // Validate request
  if (!req.body.cpf) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
    return
  }

  // Create a Cliente
  const cliente = {
    nomeCliente: req.body.nome,
    cpfCliente: req.body.cpf,
    dataNascimentoCliente: req.body.data_nascimento,
    published: req.body.published ? req.body.published : false

  }

  console.log(cliente)
  // Save Cliente in the database
  Cliente.create(cliente)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorrreu um erro na criação do novo cliente"
      })
    })
}

// Retrieve all Clientes from the database.
exports.findAll = (req, res) => {
  const search = req.query.search
  var condition = search ? { [Op.or]: [{ nomeCliente: { [Op.like]: `%${search}%` } }, { cpfCliente: { [Op.like]: `%${search}%` } }] } : null

  Cliente.findAll({ where: condition })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Um erro ocorreu ao buscar todos  os clientes"
      })
    })
}

// Find a single Cliente with an id
exports.findOne = (req, res) => {
  const id = req.params.id

  Cliente.findByPk(id)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Cliente with id=" + id
      })
    })
}

// Update a Cliente by the id in the request
exports.update = (req, res) => {
  const id = req.params.id

  Cliente.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "id do cliente foi atualizado com sucesso"
        })
      } else {
        res.send({
          message: `nao foi possivel atualizar o nome. talvez tenha sido escrito errado ou o valor esteja vazio`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "erro ao atualizar o nome" + nome
      })
    })
}

// Delete a Cliente with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id

  Cliente.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "cliente was deleted successfully!"
        })
      } else {
        res.send({
          message: `Cannot delete cliente with id=${id}. Maybe Cliente was not found!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete cliente with id=" + id
      })
    })
}

// Delete all Clientes from the database.
exports.deleteAll = (req, res) => {
  Cliente.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Clientes were deleted successfully!` })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      })
    })
}

// Find all published Clientes
exports.findAllPublished = (req, res) => {
  Cliente.findAll({ where: { published: true } })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ocorreu um erro durante a apresentação de todos os clientes"
      })
    })
}