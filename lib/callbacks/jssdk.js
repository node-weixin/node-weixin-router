/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

var errors = require('../errors');

module.exports = {
  prepared: function(res) {
    return function(error, data) {
      if (error) {
        return res.json({
          name: errors.Failure.name,
          code: errors.Failure.code,
          message: errors.Failure.message,
          data: data
        });
      }
      return res.json({
        name: errors.Success.name,
        code: errors.Success.code,
        message: errors.Success.message,
        data: data
      });
    };
  }
};
