module.exports = app => {
    const contato = require("../controller/contato.controller");
  
    var router = require("express").Router();
  
    // Create a new contato
    router.post("/", contato.create);
  
    // Retrieve all contatos
    router.get("/", contato.findAll);
  
    // Retrieve all published contatos
    router.get("/published", contato.findAllPublished);
  
    // Retrieve a single contato with id
    router.get("/:id", contato.findOne);
  
    // Update a contato with id
    router.put("/:id", contato.update);
  
    // Delete a contato with id
    router.delete("/:id", contato.delete);
  
    // Delete all contatos
    router.delete("/", contato.deleteAll);
  
    app.use('/api/contato', router);
  };