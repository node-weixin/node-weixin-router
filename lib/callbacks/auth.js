var errors = require('../errors');

export default {
  ack: function(res) {
    return function(error, data) {
      if (!error) {
        res.send(data);
        return;
      }
      if (data.key) {
        res.send(errors.InputInvalid);
        return;
      }
      switch (data) {
        case 2:
          res.send(errors.SignatureNotMatch);
          break;
        default:
          res.send(errors.UnknownError);
          break;
      }
    };
  }
};
