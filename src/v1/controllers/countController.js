import dotenv from 'dotenv';
import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from 'http-status';

import countHelper from '../helpers/countHelper';
import responseHelper from '../helpers/responseHelper';

dotenv.config();
/**
* This class contains all methods (functions) required to handle
* fetchData function.
* Other function.
* Other function.
* Other function.
* Etc ...
*/
class UserController {
  /**
     * Handle fetchData.
     * @param {object} req user request.
     * @param {object} res data response.
     * @returns {object} returned object of data.
     */
  static async fetchData(req, res) {
    try {
      const data = await countHelper.fetchData(req.body);

      if (data.length < 1) {
        responseHelper.handleError(NOT_FOUND, 'Not found.');
        return responseHelper.response(res);
      }

      responseHelper.handleSuccess(OK, 'Success.', data);
      return responseHelper.response(res);
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json({
        status: INTERNAL_SERVER_ERROR,
        message: error.toString()
      });
    }
  }
}

export default UserController;
