import recordSchema from '../models/record';

/**
* This class contains methods (functions) required to handle
* fetchData function.
* Other function.
* Other function.
* Other function.
* Etc ...
*/
class CountHelper {
  /**
   * fetchData: this is function that fetch data from recordSchema in database.
   * @param {object} body request details.
   * @returns {object} fetched data.
   */
  static async fetchData(body) {
    const data = await recordSchema.aggregate([
      { $project: {
        _id: 0,
        key: 1,
        createdAt: { $gte: body.startDate, $lt: body.endDate },
        count: {
          $cond: [{ $and: [
            { $gte: ["$counts", body.minCount] },
            { $lte: ["$counts", body.maxConut] }] },
          "$counts",
          0]
        },
      } },
      { $group: {
        totalCount: { $sum: '$count' }
      } }]);

    return data;
  }
}

export default CountHelper;
