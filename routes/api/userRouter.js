var express = require('express');
var router = express.Router();
const ensureLoggedIn = require('../../config/ensureLoggedIn');

var usersCtrl = require("../../controllers/api/userCtrlers");

//* all paths start with '/api/users
// router.get('/', usersCtrl.showAll);

//* POST /api/users             (create a user - sign up)
// router.post('/login', usersCtrl.login);
router.post('/', usersCtrl.create);

//* POST /api/users/login       (log in )
router.post('/login', usersCtrl.login);

//* GET /api/users/check-token  (check token)
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);

module.exports = router;





