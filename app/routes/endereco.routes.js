module.exports = app => {
    const endereco = require("../controller/endereco.controller");
  
    var router = require("express").Router();
  
    // Create a new endereco
    router.post("/", endereco.create);
  
    // Retrieve all enderecos
    router.get("/", endereco.findAll);
  
    // Retrieve all published enderecos
    router.get("/published", endereco.findAllPublished);
  
    // Retrieve a single endereco with id
    router.get("/:id", endereco.findOne);
  
    // Update a endereco with id
    router.put("/:id", endereco.update);
  
    // Delete a endereco with id
    router.delete("/:id", endereco.delete);
  
    // Delete all enderecos
    router.delete("/", endereco.deleteAll);
  
    app.use('/api/endereco', router);
  };