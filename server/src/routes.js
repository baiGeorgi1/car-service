const router = require('express').Router();
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const carController = require('./controllers/carController');

router.use(homeController);
router.use('/users', userController);
// todo - remove this controller
router.use('/car', carController);

router.get('*', (req, res) => {
    res.redirect('/404');
});

module.exports = router;