'use strict';

const { createLogger, transports } = require('winston');
import AppConfigLoader from '../../config/app/app-config-loader';
const logform = require('logform');
const { combine, timestamp, printf } = logform.format;

export default class Logger {

	private static instance: Logger;
	private static Level = { ERROR: 1, WARN: 2, INFO: 3, DEBUG: 4 };
	private static LEVEL: any;
	private DIRECTORY: string;

	private logger: any;

	static getInstance() {
		return this.instance || (this.instance = new this());
	}

	private constructor() {
		this.initialize();
	}

	private initialize() {
		let logConfig: any = AppConfigLoader.getInstance().getLogProperties();
		let ipAddress = AppConfigLoader.getInstance().getIPAddress();
		let packageName = AppConfigLoader.getInstance().getPackageName();
		this.DIRECTORY = logConfig.directory;
		
		// log level
		switch (logConfig.level) {
			case 'error': Logger.LEVEL = Logger.Level.ERROR; break;
			case 'warn': Logger.LEVEL = Logger.Level.WARN; break;
			case 'info': Logger.LEVEL = Logger.Level.INFO; break;
			case 'debug': Logger.LEVEL = Logger.Level.DEBUG; break;
			default: Logger.LEVEL = Logger.Level.INFO; break;
		}

		let options = {
			level: 'info',
			stderrLevels: ['error', 'debug', 'warn']
		}

		let transportsArray = [new transports.Console(options)];
		if (logConfig.write_to_file && logConfig.write_to_file == true) {
			let fileOptions = {
				level: 'info',
				filename: this.DIRECTORY + '/server.log'
			}
			transportsArray.push(new transports.File(fileOptions));
		}

		this.logger = createLogger({
			format: combine(
				timestamp(),
				printf(nfo => {
					return `[${nfo.timestamp}] - [${nfo.level}] [${packageName}] [${ipAddress}] : [${nfo.message}]`;
				})
			),
			transports: transportsArray
		});
	}

	public error(msg: string): void {
		if (Logger.LEVEL >= Logger.Level.ERROR) {
			this.logger.error(msg);
		}
	}

	public warn(msg: string): void {
		if (Logger.LEVEL >= Logger.Level.WARN) {
			this.logger.warn(msg);
		}
	}

	public info(msg: string): void {
		if (Logger.LEVEL >= Logger.Level.INFO) {
			this.logger.info(msg);
		}
	}

	public debug(msg: string): void {
		if (Logger.LEVEL >= Logger.Level.DEBUG) {
			this.logger.debug(msg);
		}
	}

}
