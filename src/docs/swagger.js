const { version } = require('../../package.json')

const swaggerDefinition = {

    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            version,
            title: "KeyWe API documentation",
            servers: [
                {
                    url: `http://localhost:${process.env.PORT}/v1`,
                }
            ]
        }
    },
};



module.exports =  swaggerDefinition



