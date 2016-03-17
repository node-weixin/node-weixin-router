/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

var errors = require('../errors');

module.exports = {
  prepared: function(res) {
    return function(error, data) {
      if (error) {
        return res.json({
          name: errors.Error.name,
          code: errors.Error.code,
          message: errors.Error.message,
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
