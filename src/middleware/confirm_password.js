const { check } = require('express-validator');
const confirmPassword = (req, res, next) => {
    if (req.body.password !== req.body.passwordConfirmation) {
        var err = new Error('Passwords do not match.');
        err.status = 202;
        return next(err);
    }
    next()
}
module.exports = confirmPassword