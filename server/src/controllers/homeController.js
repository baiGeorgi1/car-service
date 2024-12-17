const router = require('express').Router();
const carManager = require('../managers/carManager');
const { auth, isAuth } = require('../middlewares/auth');


router.get('/', async (req, res) => {

    res.render('home',);
});
router.get('/catalog', async (req, res) => {
    const cars = await carManager.getAll();
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

router.post('/catalog/add-car', auth, async (req, res) => {
    const { ...data } = req.body;
    try {
        const car = await carManager.create({
            ...data,
            // owner: req.user._id
        });
        res.json(car);

        // res.redirect('/catalog');
    } catch (error) {
        // res.render('cars/add', { data, error: getErrorMessage(error), });
    }

});
router.get('/delete/:carId', async (req, res) => {
    const id = req.params.carId;

    const car = await carManager.getById(id);

    try {
        const deleted = await carManager.deleteItem(car);
        res.json(deleted);
        //res.redirect('/catalog');
    } catch (err) {
        res.json(err);
        //res.render('car/details', { car, error: getErrorMessage(err) });
    }

});
router.put('/edit/:carId', async (req, res) => {
    const { ...data } = req.body;
    const carId = req.params.carId;
    try {

        const edited = await carManager.edit(carId, data);
        res.json(edited);
        // res.redirect(`/car/details/${item}`);

    } catch (err) {
        const error = getErrorMessage(err);
        res.status(500).json(error.error.message);
        // res.render(`car/edit`, { item, error: getErrorMessage(err), ...data });
    }
});






// router.get('/search', isAuth, async (req, res) => {
//     const { name, type } = req.query;
//     const found = await carManager.getAll(name, type);
//     console.log(found);
//     res.render('search', { found });
// });
router.get('/404', (req, res) => {
    res.render('404');

});
module.exports = router;