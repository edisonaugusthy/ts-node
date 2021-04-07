import http = require('http');

import { ServiceDependencyInit } from './init/service-dependency.init';
import expressApp from './server';
import Logger from './logger/logger';
const logger = Logger.getInstance();

const app_port = process.env.APP_PORT || 3000;
let server: any = {};

// Initializing dependencies

server = http.createServer(expressApp);

// Initializing the dependencies
(new ServiceDependencyInit()).init(server);

server.listen(app_port, function () {
    const addressInfo = server.address();
    logger.info('Server listening on port: ' + addressInfo["port"]);
    server.on('error', onError);
    server.on('listening', onListening);
});


/**
 * onError
 *
 * @param {NodeJS.ErrnoException} error
 */
function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = (typeof app_port === 'string') ? 'Pipe ' + app_port : 'Port ' + app_port;
    switch (error.code) {
        case 'EACCES':
            logger.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * onListening
 *
 */
function onListening(): void {
    const addr = server.address();
    const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
}
