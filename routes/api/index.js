const router = require('express').Router();

const user_routes = require('./users.api.routes');
const thought_routes = require('./thoughts.api.routes');

router.use('/users', user_routes);
router.use('/thoughts', thought_routes);

module.exports = router;