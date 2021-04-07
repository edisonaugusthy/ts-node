import { Request, Response } from 'express';
import express = require('express');
import bodyParser = require('body-parser');
import compression = require('compression');
import helmet = require('helmet');
import path = require('path');
// Config
import AppConfigLoader from '../config/app/app-config-loader';
// Swagger
//import SwaggerUI from './swagger';
// Router
import ServerRoute from './server-route';

import { defaultSpeedLimiter } from './middleware/throttling-middleware';

// kafka
var kafka = require('./kafka');
import Scheduler from './scheduler';

class Server {

  public expressApp = express();

  public documentProperties: any;
  public router = express.Router();
  private appConfigLoaderObj: AppConfigLoader;
  //private swaggerUi: SwaggerUI;
  public scheduler: Scheduler;

  constructor() {

    this.appConfigLoaderObj = new AppConfigLoader();
   // this.swaggerUi = new SwaggerUI();

    
    this.config();
    this.routes();
    this.scheduler = new Scheduler();
    this.scheduler.setScheduledJobs();// Enable all scheduled jobs in server.
  }

  public config(): void {

    // express middleware
    this.expressApp.use(bodyParser.urlencoded({ extended: true, limit: '15mb' }));
    this.expressApp.use(bodyParser.json({ limit: '50mb' }));

    this.expressApp.use(compression());
    this.expressApp.use(helmet());

    this.expressApp.use((request: Request, response: Response, next) => {
      response.header('Access-Control-Allow-Origin', '*');
      response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });

    const documentProperties = this.appConfigLoaderObj.getDocumentProperties();
    this.expressApp.use('/static/manual', express.static(path.resolve(documentProperties.asset.base)));


  }

  public routes(): void {

    const appProperties = this.appConfigLoaderObj.getApplicationProperties();
    const appVersion = appProperties.version;

    // Routers for Services
    ServerRoute.getInstance().route(this.expressApp, appVersion);
    // Resource /v1.2
    this.expressApp.use('/v' + appVersion, this.router);
    // Start REST API server with authentication
    this.expressApp.use(this.router);

  }

}

export default new Server().expressApp;
