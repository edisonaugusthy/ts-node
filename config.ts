
const env = process.env.NODE_ENV || 'local';
const appEnv = process.env.APP_ENV || 'shore';
const packageName = process.env.npm_package_name;
import ip = require('ip');

import prodConfig = require('./app-prod.config.json');
import testConfig = require('./app-test.config.json');
import localConfig = require('./app-local.config.json');
import devConfig = require('./app-dev.config.json');
import demoConfig = require('./app-demo.config.json');
import appNonEnvConfig = require('./app-non-env.config.json');
import FCMConfig = require('./smartship-go-fcm-key.json');

/**
 * Class to load the application configuration properties based on the enviroments
 */
export default class AppConfigLoader {

	private static instance: AppConfigLoader;

	private config: any;
	private applicationProperties: any;
	
	constructor() {
		switch (env) {
			case 'development': { this.config = devConfig; }; break;
			case 'test': { this.config = testConfig; }; break;
			// Production config file will be added dynamically using scripts during the deployment time.
			case 'prod': { this.config = prodConfig; }; break;
			case 'demo': { this.config = demoConfig; }; break;
			default: { this.config = localConfig; }; break;
		}



		this.applicationProperties = this.config.application;
		this.redisProperties = this.config.redis;

	}

	static getInstance() {
		return this.instance || (this.instance = new this());
	}

	public getIPAddress() {
		return ip.address();
	}



}
