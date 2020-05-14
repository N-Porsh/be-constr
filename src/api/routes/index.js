const router = require('express-promise-router')();
const {authenticate, roleRequired} = require('../middlewares/auth');
const authController = require('../controllers/AuthController');
const objectController = require('../controllers/ObjectController');
const reportController = require('../controllers/ReportController');
const responsibleController = require('../controllers/ResponsibleController');
const observationController = require('../controllers/ObservationController');
const defectController = require('../controllers/DefectController');


//public routes
router.post('/auth/login', authController.login);
router.post('/auth/token', authController.refreshToken);

// protected routes
router.all('*', authenticate, roleRequired('INSPECTORS'));

router.post('/auth/register', authController.register);
router.get('/objects', objectController.getActiveObjects);
router.get('/objects/:id', objectController.getOneObject);
router.post('/objects', objectController.addObject);
router.post('/reports', reportController.addReport);
router.put('/reports/:id', reportController.updateReport);
router.get('/reports', reportController.getAllReports);
router.get('/reports/:id', reportController.getReportById);
router.get('/responsibles', responsibleController.getAllResponsibles);
router.post('/responsibles', responsibleController.addResponsible);
router.get('/observations/types', observationController.getActiveObservationTypes);
router.post('/observations/types', observationController.addObservationType);
router.get('/defects', defectController.getAllDefects);
router.put('/defects/:id', defectController.updateDefect);

module.exports = router;
