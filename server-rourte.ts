'use strict';
import { Express } from 'express';
import AppConfigLoader from '../config/app/app-config-loader';




export default class ServerRoute {
    private appConfigLoaderObj: AppConfigLoader;
    private static instance: ServerRoute;
    private authenticationRouter: AuthenticationRouter;
   

   

    private constructor() {

      

     
        this.sdfsdf = new sdfsfsdfsdf();

    }

    public static getInstance(): ServerRoute {
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    }

    public route(expressapp: Express, appVersion) {

        // Disabling api-docs for Prod run. 
        if (this.appConfigLoaderObj.getEnvironment() !== 'prod') {
            const SwaggerUI = require('./swagger');
            let swaggerUi = new SwaggerUI();
            expressapp.use('/v' + appVersion + '/api-docs', defaultSpeedLimiter, swaggerUi.router);
        }

        expressapp.use('/v' + appVersion + '/asd', securityFilter, defaultSpeedLimiter, this.masterTagRouter.router);
        e

    }
}
