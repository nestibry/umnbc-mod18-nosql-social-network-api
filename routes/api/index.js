const router = require('express').Router();

const template_routes = require('./template.api.routes');
const user_routes = require('./user.api.routes');

router.use('/users', user_routes);

router.use('/template', template_routes);

module.exports = router;