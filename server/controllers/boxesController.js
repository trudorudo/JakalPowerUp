const db = require("../database/models");
// console.log("inside box controller");
// Defining methods for the boxesController
module.exports = {

  findAll: function(req, res) {
  //  console.log("Query",req.query);
    db.Box
      .find()
      .then(
        // dbModel => res.json(dbModel)
        // dbModel => console.log("DB Model",dbModel)
        function ( dbModel){
        //  console.log("DBMOdel",dbModel);
        res.json(dbModel)
        }
      )
      .catch(err => res.status(422).json(err));
  }
  ,
  // findById: function(req, res) {
  //   db.Box
  //     .findById(req.params.id)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  create: function(req, res) {
    db.Box
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
  // ,
  // update: function(req, res) {
  //   db.Box
  //     .findOneAndUpdate({ _id: req.params.id }, req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // remove: function(req, res) {
  //   db.Box
  //     .findById({ _id: req.params.id })
  //     .then(dbModel => dbModel.remove())
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // }
};
