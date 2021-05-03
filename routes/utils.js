const csrf = require("csurf");
const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next);

const csrfProtection = csrf({ cookie: true });

module.exports = {
    asyncHandler,
    csrfProtection,
}