var errors = require('web-errors').errors;
export default {
  ack: function(res) {
    return function(error, data) {
      if (!error) {
        res.send(data);
        return;
      }
      if (data.key) {
        res.send(errors.INPUT_INVALID);
        return;
      }
      switch (data) {
        case 2:
          res.send(errors.SIGNATURE_NOT_MATCH);
          break;
        default:
          res.send(errors.UNKNOWN_ERROR);
          break;
      }
    };
  }
};
