const winston = require('winston');
const path = require('path');

const appRoot = path.dirname(require.main.filename); 
const options = {
    file: {
        // level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: false,
        json: false,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false
    },
    console: {
        
        handleExceptions: false,
        json: false,
        colorize: true
    }
};

const logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false 
});


logger.stream = {
    write(message) {
        
        logger.log(`${message}ms`);
    }
};

// include winston logging e.g. in error handler in app.js
// winston.error(`${req.method} \t\t ${req.url} \t\t ${err.status || 500}`);

module.exports = logger;
