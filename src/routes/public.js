const router = app.Router();
const ctrl = app.getControllers();

router.get('/', ctrl.home.get);


module.exports = router;