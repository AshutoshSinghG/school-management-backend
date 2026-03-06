const express = require('express');
const { addSchoolRules, listSchoolsRules } = require('../middleware/schoolValidator');
const { addSchool, listSchools } = require('../controllers/schoolController');

const router = express.Router();

router.post('/addSchool', addSchoolRules, addSchool);
router.get('/listSchools', listSchoolsRules, listSchools);

module.exports = router;
