import Router from 'express';
import countController from '../controllers/countController';
import { validateReq } from '../middlewares/schemaMiddleware';

const router = Router();
router
  .post('/fetch-data', validateReq, countController.fetchData);

export default router;
