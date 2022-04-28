const Router = require('express')
const UserController = require('../controllers/userController')
const router = new Router()

router.get('/', UserController.getLoginPage)
router.get('/registration', UserController.getRegPage)
router.get('/countries', UserController.getCountries)
router.get('/logged', UserController.getLoginPage)
router.post('/registration', UserController.registration)
router.post('/login', UserController.login)

module.exports = router