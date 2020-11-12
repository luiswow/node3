var express = require('express');
var router = express.Router();
const usuariosController = require('../controllers/usuarios');

/* GET users listing. */
router.get('/', usuariosController.list);
router.get('/', usuariosController.create);
router.get('/', usuariosController.create_get);
router.get('/', usuariosController.update_get);
router.get('/', usuariosController.create);
router.get('/', usuariosController.delete);
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
