const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/:id*?', (req, res, next) => {

  const filter = req.params.id ? { _id: req.params.id } : {};

  User
    .find(filter)
    .then(users => res.json(users))
    .catch(next);
});

router.post('/', async(req, res, next) => {

  try{
       let user  = await User.create(req.body);

       return res.send(user)

       console.log(user)
  }
  catch(err){
    console.log(err)
    return res.send({err:err.message})
  }

});

router.put('/:id', function (req, res, next) {
  User
    .findOneAndUpdate({ _id: req.params.id }, req.body, {new: true}, (error, result) => res.json(result))
    .catch(next);
});

router.delete('/:id', function (req, res, next) {
  User
    .findOneAndRemove({ _id: req.params.id })
    .then(user => res.json(`User '${user.firstName}' was deleted correctly.`))
    .catch(next);
});

module.exports = router;