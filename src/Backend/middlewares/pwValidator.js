const validator = require('express-validator');

const passwordValidation = validator.body('password')
.isLength({ min: 8, max: 16 })
.withMessage('Passwort zu kurz oder zu lang...')

module.exports = { passwordValidation };
