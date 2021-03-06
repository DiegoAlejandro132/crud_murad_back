const db = require("../models")
const Inquilino = db.inquilino
const Op = db.Sequelize.Op

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.cpf) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
    return
  }

  // Create a Tutorial
  const inquilino = {
    nomeInquilino: req.body.nomeInquilino,
    cpfInquilino: req.body.cpf,
    dataNascimentoInquilino: req.body.dataNascimentoInquilino,
    published: req.body.published ? req.body.published : false
  }

  // Save Tutorial in the database
  Inquilino.create(inquilino)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Inquilino."
      })
    })
}

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const search = req.query.search
  var condition = search ? { [Op.or]: [{ nomeInquilino: { [Op.like]: `%${search}%` } }, { cpfInquilino: { [Op.like]: `%${search}%` } }] } : null

  Inquilino.findAll({ where: condition })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving inquilinos."
      })
    })
}

// Find a single Inquilino with an id
exports.findOne = (req, res) => {
  const id = req.params.id

  Inquilino.findByPk(id)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving inquilino with cpf=" + id
      })
    })
}

// Update a Inquilino by the id in the request
exports.update = (req, res) => {
  const id = req.params.id

  Inquilino.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "inquilino was updated successfully."
        })
      } else {
        res.send({
          message: `Cannot update inquilino with cpf=${id}. Maybe inquilino was not found or req.body is empty!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating inquilino with cpf=" + id
      })
    })
}

// Delete a Inquilino with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id

  Inquilino.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "inquilino was deleted successfully!"
        })
      } else {
        res.send({
          message: `Cannot delete inquilino with cpf=${id}. Maybe inquilino was not found!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete inquilino with cpf=" + id
      })
    })
}

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Inquilino.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      })
    })
}

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Inquilino.findAll({ where: { published: true } })
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