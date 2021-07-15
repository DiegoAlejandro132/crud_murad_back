module.exports = app => {
    const inquilino = require("../controller/inquilino.controller");
  
    var router = require("express").Router();
  
    // Create a new inquilino
    router.post("/", inquilino.create);
  
    // Retrieve all inquilinos
    router.get("/", inquilino.findAll);
  
    // Retrieve all published inquilinos
    router.get("/published", inquilino.findAllPublished);
  
    // Retrieve a single inquilino with id
    router.get("/:id", inquilino.findOne);
  
    // Update a inquilino with id
    router.put("/:id", inquilino.update);
  
    // Delete a inquilino with id
    router.delete("/:id", inquilino.delete);
  
    // Delete all inquilinos
    router.delete("/", inquilino.deleteAll);
  
    app.use('/api/inquilinos', router);
  };