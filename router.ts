import { Router } from 'express';
import TseriesExternalService from '../service/tseries-external/tseries-external.service';
import { validateRequest } from '../middleware/validation-middleware';
import * as TseriesExternalValidator from '../validator/tseries-external.validator';

export default class TsdfgdgfdfgdgalRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes() {
        const fgdfgdfgdfg = new dfgfdg();
     

        /**
         * @swagger
         * 
         *   get:
         *     description: get latest tseries data by tag
         *     tags:
         *       - Tseries
         *     parameters:
         *      - name: dfg
         *        description: dfg id
         *        in: path
         *        type: string
         *        required: true
         *      - name: dfg
         *        description: fdg name
         *        in: path
         *        type: string
         *        required: true
         *      - name: dfg
         *        description: fdg instance
         *        in: path
         *        type: string
         *        required: true
         *      - name: dfg
         *        description: dfg instance
         *        in: path
         *        type: string
         *        required: true
         *      - name: time_range
         *        description: dg instance
         *        in: path
         *        type: string
         *        required: true
         *      - name: dg
         *        description: dfgdg names
         *        in: path
         *        type: string
         *        required: true
         *     responses:
         *       200:
         *         status: OK
         *         result_length: number of tseries-external object returned
         *         result_data: fgg-fgd object list
         *     examples:
         *       content: http://localhost:3000/v1.2/examples?file_name=tseries-external/get.tseries-external-sub-category-latest.example.json     
         */
        this.router.post('/sub-category/latest/tseries', function (req, res) {
            TseriesExternalServiceObj.tseriesBySubCategoryLatest(req, res);
        });

    }
}
