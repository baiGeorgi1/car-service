const router = require('express').Router();
const carManager = require('../managers/carManager');
const userManager = require('../managers/userManager');
const { auth, isAuth } = require('../middlewares/auth');

const { getErrorMessage } = require('../utils/errorHelper');


router.get('/add', auth, isAuth, (req, res) => {
    res.render('car/add');
});
router.post('/add', auth, isAuth, async (req, res) => {
    const { ...data } = req.body;
    try {
        await carManager.create({
            ...data,
            owner: req.user._id
        });

        res.redirect('/catalog');
    } catch (error) {
        res.render('cars/add', { data, error: getErrorMessage(error), });
    }

});
router.get('/details/:carId', auth, async (req, res) => {
    const id = req.params.carId;
    try {
        const user = req.user?._id;
        const item = await carManager.getById(id);
        console.log(item);
        const result = item.buyingList?.find((e) => e._id.toString() == user);
        const isOwner = user == item.owner.toString();
        if (isOwner) {
            res.render('car/details', { item, isOwner });
        } else {
            const isBought = user == result?._id.toString();
            console.log(isBought);
            res.render('car/details', { item, isBought });
        }

    } catch (err) {
        const error = getErrorMessage(err);
        const car = await carManager.getById(id);
        res.render(`car/details`, { car, error });
    }
});

router.get('/edit/:carId', auth, isAuth, async (req, res) => {
    try {
        const item = await carManager.getById(req.params.carId);
        res.render('car/edit', { item });
    } catch (error) {
        res.render('car/edit', { error: getErrorMessage(err) });
    }

});
router.post('/edit/:carId', auth, isAuth, async (req, res) => {
    const { ...data } = req.body;
    const item = req.params.carId;
    try {

        await carManagerManager.edit(item, data);
        res.redirect(`/car/details/${item}`);

    } catch (err) {
        const error = getErrorMessage(err);

        res.render(`car/edit`, { item, error: getErrorMessage(err), ...data });
    }
});
router.get('/delete/:carId', isAuth, async (req, res) => {
    const id = req.params.carId;
    const car = await carManagerManager.getById(id);
    try {
        await carManager.deleteItem(id);
        res.redirect('/catalog');
    } catch (err) {
        res.render('car/details', { car, error: getErrorMessage(err) });
    }

});


router.get('/buy/:carId', auth, isAuth, async (req, res) => {
    const id = req.params.carId;
    const userId = req.user._id;
    try {
        const bought = await carManager.buy(id, userId);
        console.log(bought);
        res.redirect(`/car/details/${id}`, { bought });
    } catch (err) {
        console.error(getErrorMessage(err).message);
        res.redirect(`/car/details/${id}`);
    }

});

module.exports = router;