
const router = require('express').Router();
const userManager = require('../managers/userManager'); //11.
const { TOKEN_KEY } = require('../constants');
const { getErrorMessage } = require('../utils/errorHelper');
const { isAuth } = require('../middlewares/auth');

router.get('/login', (req, res) => {
    res.render('users/login');
});
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await userManager.login(email, password);

        res.status(201).json(token);
        // res.cookie(TOKEN_KEY, token);
        //   res.redirect('/');
    } catch (err) {
        err = 'wrong username or password';
        res.status(400).json(err);
        //  res.render('users/login', { error: getErrorMessage(err) });
    }

});
router.get('/owner', async (req, res) => {
    const ownerId = req.headers.ownerid;
    const owner = await userManager.getOwner(ownerId);

    res.json(owner);


    // res.render('users/register');
});
// !! TEST
router.post('/register', async (req, res) => {
    const { email, username, password, rePassword } = req.body;

    try {
        const createUser = await userManager.register({ email, username, password, repeatPassword: rePassword });
        res.status(201).json(createUser);
    } catch (err) {
        res.status(400).json({ error: getErrorMessage(err) });
    }
});

router.post('/logout', (req, res) => {
    try {
        const result = res.clearCookie(TOKEN_KEY);
        res.status(201).json(result._destroy);
    } catch (err) {
        res.status(400).json({ error: getErrorMessage(err) });
    }
    // res.redirect('/');
});

module.exports = router;