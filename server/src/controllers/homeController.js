const router = require('express').Router();
const carManager = require('../managers/carManager');
const { auth, isAuth } = require('../middlewares/auth');


router.get('/', async (req, res) => {

    res.render('home',);
});
router.get('/catalog', async (req, res) => {
    const cars = await carManager.getAll();
    //todo remove row below if not works
    res.json(cars);
    // res.render('catalog', { cars });
});

router.get('/catalog/:carId', auth, async (req, res) => {

    const carId = req.params.carId;

    try {
        const user = req.query;
        const car = await carManager.getById(carId);
        res.json(car);
        const result = car.buyingList?.find((e) => e._id.toString() == user);
        const isOwner = user == car.owner.toString();

        if (isOwner) {
            // res.render('car/details', { item: car, isOwner });
        } else {
            const isBought = user == result?._id.toString();

            // res.render('car/details', { item: car, isBought });
        }

    } catch (err) {
        const error = getErrorMessage(err.error.message);
        const car = await carManager.getById(carId);
        // res.render(`car/details`, { car, error });
    }
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