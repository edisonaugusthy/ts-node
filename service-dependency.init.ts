'use strict';

import CassandraBaseDao from '../dao/cass-base.dao';
import RedisCommunication from '../service/communication/redis-communication.service';
import ScheduleTask from '../task/schedule/schedule.task';
import Logger from '../logger/logger';

const logger = Logger.getInstance();

let redisCommunication: RedisCommunication;

export class ServiceDependencyInit {

	private cassandraClient: any;
	private mailListener: any;
	private socket: any;
	private scheduleTaskObj: any;
	constructor() {
		this.cassandraClient = CassandraBaseDao.getInstance().getClient();
		this.scheduleTaskObj = new ScheduleTask();
	}

	public init(server) {
		this.initCassandra();
		this.socket = require('../socket')(server);
		(global as any).socket = this.socket;
		this.initRedisCommunication();
		this.mailListener = require('../mail-listener')(server);
		this.initSchedule();
	}

	private initCassandra() {
		let self = this;
		this.cassandraClient.connect(function (err) {
			if (err) {
				logger.error('Failed to connect to Cassandra: ' + err);
				process.exit(1);
			}
			logger.info('Connected to Cassandra cluster with ' + self.cassandraClient.hosts.length + ' host(s): ' + self.cassandraClient.hosts.keys());
			self.cassandraClient.hosts.forEach(function (host) {
				let hostProp = {
					address: host.address,
					cassandraVersion: host.cassandraVersion,
					datacenter: host.datacenter,
					rack: host.rack,
					isUp: host.isUp(),
					canBeConsideredAsUp: host.canBeConsideredAsUp()
				}
				logger.info(`Host ${hostProp.address} ${hostProp.cassandraVersion} on rack ${hostProp.rack}, dc ${hostProp.datacenter}, isUp: ` + hostProp.isUp);
			});
		});
	}

	private initRedisCommunication() {
		redisCommunication = RedisCommunication.getInstance();
	}

	private initSchedule() {
		let self = this;
		this.scheduleTaskObj.refreshUserRedis().then(function (rule: any) {

		}).catch(function (err) {
			logger.error('Error occured in ServiceDependencyInit.initSchedule() : ' + err);
		});
	}
}

export { redisCommunication };
