const db = require("../models");
const Ticket = db.ticket;

exports.create = (req, res) => {
  if (!req.body.description) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const ticket = new Ticket({
    description: req.body.description,
    status: req.body.status,
    priority: req.body.priority,
    dateOpened: req.body.dateOpened,
    dateClosed: req.body.dateClosed,
    project_id: req.body.project_id
  });

  ticket
    .save(ticket)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Ticket."
      });
    });
};

exports.findAll = (req, res) => {
  Ticket.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tickets."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Ticket.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Ticket with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Ticket with id=" + id });
    });
};

exports.setComplete = (req, res) => {
  const id = req.params.id;

  Ticket.findByIdAndUpdate(id, {status: "completed"}, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Ticket with id=${id}!`
        });
      } else res.send({ message: "Ticket was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Ticket with id=" + id
      });
    });
};

exports.setClosed = (req, res) => {
  const id = req.params.id;

  Ticket.findByIdAndUpdate(id, {status: "closed"}, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Ticket with id=${id}!`
        });
      } else res.send({ message: "Ticket was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Ticket with id=" + id
      });
    });
};
