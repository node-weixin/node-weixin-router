var errors = require('web-errors').errors;

export default {
  prepared: function(res) {
    return function (error, data) {
      if (error) {
        return res.json({
          code: errors.ERROR.code,
          message: errors.ERROR.message,
          data: data
        });
      }
      return res.json({
        code: errors.SUCCESS.code,
        message: errors.SUCCESS.message,
        data: data
      });
    };
  }
};
