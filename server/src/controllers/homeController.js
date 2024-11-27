const router = require('express').Router();
const carManager = require('../managers/carManager');
const { isAuth } = require('../middlewares/auth');


router.get('/', async (req, res) => {

    res.render('home',);
});
router.get('/catalog', async (req, res) => {
    const cars = await carManager.getAll();
    //todo remove row below if not works
    res.json(cars);
    // res.render('catalog', { cars });
});
router.get('/search', isAuth, async (req, res) => {
    const { name, type } = req.query;
    const found = await carManager.getAll(name, type);
    console.log(found);
    res.render('search', { found });
});
router.get('/404', (req, res) => {
    res.render('404');

});
module.exports = router;