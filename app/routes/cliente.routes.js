
module.exports = app => {
    const cliente = require("../controller/cliente.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/api/cliente", cliente.create);
  
    // Retrieve all Tutorials
    router.get("/", cliente.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", cliente.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", cliente.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", cliente.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", cliente.delete);
  
    // Delete all Tutorials
    router.delete("/", cliente.deleteAll);
  
    app.use('/cliente/', router);
  };