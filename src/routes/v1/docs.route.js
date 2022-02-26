const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition  = require('../../docs/swagger');


const router = express.Router();

const options = {
    ...swaggerDefinition,
    apis: ['src/docs/*.yml', 'src/routes/v1/*js'],
};

const specs = swaggerJsdoc(options);


router.use('/', swaggerUi.serve);
router.get(
    '/',
    swaggerUi.setup(specs, {
        explorer: true,
    })
);

module.exports = router
