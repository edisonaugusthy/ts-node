'use strict';
import { Express } from 'express';
import AppConfigLoader from '../config/app/app-config-loader';
import AuthenticationRouter from './router/authentication.router';
import UserRouter from './router/user.router';
import VesselRouter from './router/vessel.router';
import AssetDocumentRouter from './router/asset-document.router';
import AssetDocumentMasterRouter from './router/asset-document-master.router';
import AssetRouter from './router/asset.router';
import ShipTagRouter from './router/ship-tag.router';
import TSeriesRouter from './router/tseries.router';
import ApplicationAggregationTagRouter from './router/application-aggregation-tag.router';
import TSeriesAggregationTagRouter from './router/tseries-aggregation-tag.router';
import TSeriesAnalyticRouter from './router/tseries-analytic.router';
import ConfigSettingsRouter from './router/config-settings.router';
import CompanyRouter from './router/company.router';
import ApplicationTagRouter from './router/application-tag.router';
import TseriesApplicationTagRouter from './router/tseries-application-tag.router';
import DerivedTagRouter from './router/derived-tag.router';
import AlertRouter from './router/alert.router';
import CaseRouter from './router/case.router';
import CaseLogRouter from './router/case-log.router';
import NmeaRouter from './router/nmea.router';
import TFOCRouter from './router/tfoc.router';
import VoyageRouter from './router/voyage.router';
import EcaRouter from './router/eca.router';
import TFOCExternRouter from './router/tfoc-external.router';
import EPMExternRouter from './router/epm-external.router';
import ServerEnvironmentRouter from './router/server-environment.router';
import ServerConfigRouter from './router/server-config.router';
import ModbusRouter from './router/modbus.router';
import AppRouter from './router/app.router';
import NotificationTypeRouter from './router/notification-type.router';
import ArchivedReportRouter from './router/report-archived.router';
import TSeriesAisTagRouter from './router/tseries-ais-tag.router';
import NotificationRouter from './router/notification.router';
import PeriodicReportRouter from './router/periodic-report.router';
import CCTVRouter from './router/cctv.router';
import RmdRouter from './router/rmd.router';
import ResetPwdRouter from './router/resetpwd.router';
import SecurityQuestionRouter from './router/security-question.router';
import ExampleRouter from './router/example.router';
import IsmCategoryRouter from './router/ism-category.router';
import RunHourConfigurationRouter from './router/run-hour-configuration.router';
import FlagRouter from './router/flag.router';
import CharterPartyRouter from './router/charter-party.router';
import CategorySystemMasterRouter from './router/category-system-master.router';
import EventCounterRouter from './router/event-counter.router';
import DataExportDetailsRouter from './router/data-export-details.router';
import XMLEditorRouter from './router/xml-editor.routes'
import PortLocationRouter from './router/port-location.router'
import DBVersionRouter from './router/db-version.router'
import TestRouter from './router/test.router';
import FeedBackRouter from './router/feedback.router';
import MasterTagRouter from './router/master-tag.router';
import DataExportFavouriteRouter from './router/data-export-favourites.router';
import WeatherRouter from './router/weather.router';
import MarineTrafficRouter from './router/marine-traffic.router';
import ShipTracksRouter from './router/ship-tracks.router';
import AISHubRouter from './router/aishub.router';
import HullEfficiencyEventsRouter from './router/hull-efficiency-events.router';
import DataTypeMasterRouter from './router/data-type-master.router';
import PICCommentRouter from './router/pic-comment.router';
import OverviewManagerRouter from './router/overview-manager.router';
import ReportConfigRouter from './router/report-config.router';
import ReportRouter from './router/report.router';
import ReportOndemandRouter from './router/report-ondemand.router';
import NexusRouter from './router/nexus.router';
import AORegistryRouter from './router/ao-registry.router';
import MqttConfigRouter from './router/mqtt-config.router';
import EqipmentMasterRouter from './router/equipment-master.router';
import ASCIINMEARouter from './router/ascii-nmea.router';
import MasterVesselGroupRouter from './router/master-vessel-group.router';
import DatawarehouseRouter from './router/datawarehouse.router';
import { securitySpeedLimiter, tseriesSpeedLimiter, defaultSpeedLimiter } from './middleware/throttling-middleware';
import { securityFilter } from './middleware/security-middleware';
import DerivedTagFavoriteRouter from './router/derived-tag-favorite.router';
import ConfigCopierRouter from './router/config-copier.router';
import TseriesExternalRouter from './router/tseries-external.router';
import ExternalAssetsRouter from './router/external-assets.router';
import ConstantsRouter from './router/constants.router';
import AliasMasterRouter from './router/alias-master.router';
import MasterTagTypeRouter from './router/master-tag-type.router';
import MasterTagSourceTypeRouter from './router/master-tag-source-type.router';
import AliasAssetMappingRouter from './router/alias-asset-mapping.router';
import ProductionReleaseRouter from './router/production-release.router';
import AuditLogRouter from './router/audit-log.router';
import GeoEventRouter from './router/geo-event.router';
import MasterZoneRouter from './router/master-zone.router';
import GeoZoneCompanyMappingRouter from './router/geo-zone-company-mapping.router';
import GeoRegulationCompanyDocumentRouter from './router/geo-regulation-company-document.router';
import GeoEventVoyageZoneRouter from './router/geo-event-voyage-zone.router';
import GeoZoneVesselAlertMappingRouter from './router/geo-zone-vessel-alert-mapping.router';
import AmsEmsInterfaceRouter from './router/ams-ems-interface.router';
import NapaTrimOptimizationRouter from './router/napa-trim-optimization.router';
import VideoTutorialRouter from './router/video-tutorial.router';
import ExternalTagMasterRouter from './router/external-tag-master.router';
import LashingVesselSettingsRouter from './router/lashing-vessel-settings.router';
// import LashingVesselInfoRouter from './router/lashing-vessel-info.router';


export default class ServerRoute {
    private appConfigLoaderObj: AppConfigLoader;
    private static instance: ServerRoute;
    private masterTagRouter: MasterTagRouter;
    private authenticationRouter: AuthenticationRouter;
    private userRouter: UserRouter;
    private vesselRouter: VesselRouter;
    private assetDocumentRouter: AssetDocumentRouter;
    private assetDocumentMasterRouter: AssetDocumentMasterRouter;
    private assetRouter: AssetRouter;
    private shipTagRouter: ShipTagRouter;
    private tseriesRouter: TSeriesRouter;
    private applicationAggregationTagrouterobj: ApplicationAggregationTagRouter;
    private tseriesAggregationTagRouter: TSeriesAggregationTagRouter;
    private tseriesAnalyticRouter: TSeriesAnalyticRouter;
    private configSettingsRouter: ConfigSettingsRouter;
    private archivedReportRouter: ArchivedReportRouter;
    private companyrouter: CompanyRouter;
    private applicationTagRouter: ApplicationTagRouter;
    private tseriesApplicationRouter: TseriesApplicationTagRouter;
    private derivedTagRouter: DerivedTagRouter;
    private alertRouter: AlertRouter;
    private caseRouter: CaseRouter;
    private caseLogRouter: CaseLogRouter;
    private nmeaRouter: NmeaRouter;
    private tfocRouter: TFOCRouter;
    private voyageRouter: VoyageRouter;
    private tfocExtrnRouter: TFOCExternRouter;
    private epmExtrnRouter: EPMExternRouter;
    private serverEnvironmentRouter: ServerEnvironmentRouter;
    private serverConfigRouter: ServerConfigRouter;
    private modbusRouter: ModbusRouter;
    private ecaRouter: EcaRouter;
    private tseriesAisTagRouter: TSeriesAisTagRouter;
    private charterPartyRouter: CharterPartyRouter;
    private appRouter: AppRouter;
    private notificationTypeRouter: NotificationTypeRouter;
    private notificationRouter: NotificationRouter;
    private periodicReportRouter: PeriodicReportRouter;
    private CCTVRouter: CCTVRouter;
    private rmdRouter: RmdRouter;
    private resetPwdRouter: ResetPwdRouter;
    private securityQuestionRouter: SecurityQuestionRouter;
    private exampleRouter: ExampleRouter;
    private ismCategoryRouter: IsmCategoryRouter;
    private flagRouter: FlagRouter;
    private categorysystemRouter: CategorySystemMasterRouter;
    private runhourconfigurationRouter: RunHourConfigurationRouter;
    private eventCounterRouter: EventCounterRouter;
    private portLocationRouter: PortLocationRouter;
    private dbVersionRouter: DBVersionRouter;
    private dataExportDetailsRouter: DataExportDetailsRouter;
    private testRouter: TestRouter;
    private feedBackRouter: FeedBackRouter;
    private dataExportFavouriteRouter: DataExportFavouriteRouter;
    private weatherRouter: WeatherRouter;
    private marineTrafficRouter: MarineTrafficRouter;
    private shipTracksRouter: ShipTracksRouter;
    private aishubRouter: AISHubRouter;
    private hullEfficiencyEventsRouter: HullEfficiencyEventsRouter;
    private dataTypeMasterRouter: DataTypeMasterRouter;
    private picCommentRouter: PICCommentRouter;
    private overviewManagerRouterObj: OverviewManagerRouter;
    private reportConfigObj: ReportConfigRouter;
    private reportRouter: ReportRouter;
    private reportOndemandRouter: ReportOndemandRouter;
    private xmlEditor: XMLEditorRouter;
    private mqttconfigrouter: MqttConfigRouter;
    private equipmentmaster: EqipmentMasterRouter;
    private asciinmearouterObj: ASCIINMEARouter;
    private masterVesselGroupRouter: MasterVesselGroupRouter;
    private datawarehouseRouter: DatawarehouseRouter;
    private nexusRouter: NexusRouter;
    private aoRegistryRouter: AORegistryRouter;

    public derivedTagFavoriteRouter: DerivedTagFavoriteRouter;
    //public swaggerUi: SwaggerUI;
    public configCopierRouter: ConfigCopierRouter;
    public tseriesExternalRouter: TseriesExternalRouter;
    public externalAssetsRouter: ExternalAssetsRouter;
    public aliasMasterRouter: AliasMasterRouter;
    public masterTagTypeRouter: MasterTagTypeRouter;
    public masterTagSourceTypeRouter: MasterTagSourceTypeRouter;
    public aliasAssetMappingRouter: AliasAssetMappingRouter;
    public productionReleaseRouter: ProductionReleaseRouter
    public geoEventRouter: GeoEventRouter;
    public constantsRouter: ConstantsRouter;
    public auditlogRouter: AuditLogRouter;
    public masterZoneRouter: MasterZoneRouter;
    public geoZoneCompanyMappingRouter: GeoZoneCompanyMappingRouter;
    public geoRegulationCompanyDocumentRouter: GeoRegulationCompanyDocumentRouter;
    public geoEventVoyageZoneRouter: GeoEventVoyageZoneRouter;
    public geoZoneVesselAlertMappingRouter: GeoZoneVesselAlertMappingRouter;
    public amsEmsInterfaceRouter: AmsEmsInterfaceRouter;
    public napaOptimizationRouter: NapaTrimOptimizationRouter;
    public videoTutorialRouter: VideoTutorialRouter
    public externalTagMasterRouter: ExternalTagMasterRouter;
    public lashingVesselSettingsRouter: LashingVesselSettingsRouter;
    // public LashingVesselInfoRouter: LashingVesselInfoRouter;

    private constructor() {

        this.appConfigLoaderObj = new AppConfigLoader();
        this.masterTagRouter = new MasterTagRouter();
        this.authenticationRouter = new AuthenticationRouter();
        this.userRouter = new UserRouter();
        this.vesselRouter = new VesselRouter();
        this.assetDocumentRouter = new AssetDocumentRouter();
        this.assetDocumentMasterRouter = new AssetDocumentMasterRouter();
        this.assetRouter = new AssetRouter();
        this.shipTagRouter = new ShipTagRouter();
        this.tseriesRouter = new TSeriesRouter();
        this.applicationAggregationTagrouterobj = new ApplicationAggregationTagRouter();
        this.tseriesAggregationTagRouter = new TSeriesAggregationTagRouter();
        this.tseriesAnalyticRouter = new TSeriesAnalyticRouter();
        this.configSettingsRouter = new ConfigSettingsRouter();
        this.companyrouter = new CompanyRouter();
        this.applicationTagRouter = new ApplicationTagRouter();
        this.tseriesApplicationRouter = new TseriesApplicationTagRouter();
        this.derivedTagRouter = new DerivedTagRouter();
        this.alertRouter = new AlertRouter();
        this.caseRouter = new CaseRouter();
        this.caseLogRouter = new CaseLogRouter();
        this.nmeaRouter = new NmeaRouter();
        this.tfocRouter = new TFOCRouter();
        this.tfocExtrnRouter = new TFOCExternRouter();
        this.epmExtrnRouter = new EPMExternRouter();
        this.serverEnvironmentRouter = new ServerEnvironmentRouter();
        this.serverConfigRouter = new ServerConfigRouter();
        this.modbusRouter = new ModbusRouter();
        this.appRouter = new AppRouter();
        this.notificationTypeRouter = new NotificationTypeRouter();
        this.archivedReportRouter = new ArchivedReportRouter();
        this.voyageRouter = new VoyageRouter();
        this.tseriesAisTagRouter = new TSeriesAisTagRouter();
        this.ecaRouter = new EcaRouter();
        this.notificationRouter = new NotificationRouter();
        this.periodicReportRouter = new PeriodicReportRouter();
        this.CCTVRouter = new CCTVRouter();
        this.rmdRouter = new RmdRouter();
        this.resetPwdRouter = new ResetPwdRouter();
        this.securityQuestionRouter = new SecurityQuestionRouter();
        this.exampleRouter = new ExampleRouter();
        this.runhourconfigurationRouter = new RunHourConfigurationRouter();
        this.ismCategoryRouter = new IsmCategoryRouter();
        this.flagRouter = new FlagRouter();
        this.charterPartyRouter = new CharterPartyRouter();
        this.categorysystemRouter = new CategorySystemMasterRouter();
        this.eventCounterRouter = new EventCounterRouter();
        this.xmlEditor = new XMLEditorRouter();
        this.portLocationRouter = new PortLocationRouter();
        this.dbVersionRouter = new DBVersionRouter();
        this.dataExportDetailsRouter = new DataExportDetailsRouter();
        this.testRouter = new TestRouter();
        this.feedBackRouter = new FeedBackRouter();
        this.dataExportFavouriteRouter = new DataExportFavouriteRouter();
        this.weatherRouter = new WeatherRouter();
        this.marineTrafficRouter = new MarineTrafficRouter();
        this.shipTracksRouter = new ShipTracksRouter();
        this.aishubRouter = new AISHubRouter();
        this.hullEfficiencyEventsRouter = new HullEfficiencyEventsRouter();
        this.dataTypeMasterRouter = new DataTypeMasterRouter();
        this.picCommentRouter = new PICCommentRouter();
        this.mqttconfigrouter = new MqttConfigRouter();
        this.overviewManagerRouterObj = new OverviewManagerRouter();
        this.reportConfigObj = new ReportConfigRouter();
        this.reportRouter = new ReportRouter();
        this.reportOndemandRouter = new ReportOndemandRouter();
        this.equipmentmaster = new EqipmentMasterRouter();
        this.asciinmearouterObj = new ASCIINMEARouter();
        this.masterVesselGroupRouter = new MasterVesselGroupRouter();
        this.datawarehouseRouter = new DatawarehouseRouter();
        this.nexusRouter = new NexusRouter();
        this.aoRegistryRouter = new AORegistryRouter();

        this.derivedTagFavoriteRouter = new DerivedTagFavoriteRouter();

        this.configCopierRouter = new ConfigCopierRouter();
        this.tseriesExternalRouter = new TseriesExternalRouter();
        this.externalAssetsRouter = new ExternalAssetsRouter();
        this.aliasMasterRouter = new AliasMasterRouter();
        this.masterTagTypeRouter = new MasterTagTypeRouter();
        this.masterTagSourceTypeRouter = new MasterTagSourceTypeRouter();
        this.aliasAssetMappingRouter = new AliasAssetMappingRouter();
        this.productionReleaseRouter = new ProductionReleaseRouter();
        this.constantsRouter = new ConstantsRouter();
        this.auditlogRouter = new AuditLogRouter();

        this.geoEventRouter = new GeoEventRouter();
        this.masterZoneRouter = new MasterZoneRouter();
        this.geoZoneCompanyMappingRouter = new GeoZoneCompanyMappingRouter();
        this.geoRegulationCompanyDocumentRouter = new GeoRegulationCompanyDocumentRouter();
        this.geoEventVoyageZoneRouter = new GeoEventVoyageZoneRouter();
        this.geoZoneVesselAlertMappingRouter = new GeoZoneVesselAlertMappingRouter();
        this.amsEmsInterfaceRouter = new AmsEmsInterfaceRouter();
        this.napaOptimizationRouter = new NapaTrimOptimizationRouter();
        this.videoTutorialRouter = new VideoTutorialRouter();
        this.externalTagMasterRouter = new ExternalTagMasterRouter();
        this.lashingVesselSettingsRouter = new LashingVesselSettingsRouter();
        // this.LashingVesselInfoRouter = new LashingVesselInfoRouter();
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
