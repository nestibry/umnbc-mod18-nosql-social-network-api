const router = require('express').Router();

const template_routes = require('./template.api.routes');

router.use('/template', template_routes);

module.exports = router;