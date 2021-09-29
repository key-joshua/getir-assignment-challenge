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
      {
        $match: {
          createdAt: { $gt: new Date(body.startDate), $lt: new Date(body.endDate) }
        }
      },
      {
        $project: {
          _id: 0,
          key: '$key',
          createdAt: '$createdAt',
          totalCount: {
            $sum: {
              $filter: {
                input: "$counts",
                as: "counts",
                cond: {
                  $and: [
                    { $gte: ["$$counts", body.minCount] },
                    { $lte: ["$$counts", body.maxCount] }
                  ]
                }
              }
            }
          }
        }
      }]);

    return data;
  }
}

export default CountHelper;
