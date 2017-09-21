const router = require('express-promise-router')();
const PopularNameController = require('../controllers/popular_name');
const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers');

router.route('/getOccurrences/:name/:sex')
  .get(validateParam(schemas.nameSchema, 'name'), validateParam(schemas.sexSchema, 'sex'), PopularNameController.getOccurancesByNameSex);

router.route('/getRandomName')
  .get(PopularNameController.getRandomName);

router.route('/getMostPopularNames/:threshold')
  .get(validateParam(schemas.thresholdSchema, 'threshold'), PopularNameController.getMostPopularNames);

router.route('/getTopNames/:sex')
  .get(validateParam(schemas.sexSchema, 'sex'), PopularNameController.getTopNamesForSex);

module.exports = router;
