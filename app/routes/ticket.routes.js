module.exports = app => {
    const tickets = require("../controllers/ticket.controller.js");
  
    var router = require("express").Router();
  
    router.post("/new", tickets.create);

    router.get("/", tickets.findAll);

    router.get("/:id", tickets.findOne);

    router.put("/:id/complete", tickets.setComplete);

    router.put("/:id/close", tickets.setClosed);
  
    app.use('/api/tickets', router);
  };