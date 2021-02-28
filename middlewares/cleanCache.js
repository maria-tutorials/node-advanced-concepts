const { clearHash } = require('./../services/cache');

module.exports = async (req, res, next) => {
    await next(); // :O

    clearHash(req.user.id);
};
  