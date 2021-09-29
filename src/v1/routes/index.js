import Router from 'express';
import countRoute from './countRoute';

const router = Router();
router.use('/count', countRoute);

export default router;
