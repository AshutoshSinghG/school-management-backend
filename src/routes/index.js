const express = require('express');
const schoolRoutes = require('./schoolRoutes');

const router = express.Router();

router.get('/health', (_req, res) => {
    res.status(200).json({
        success: true,
        status: 'ok',
        timestamp: new Date().toISOString(),
    });
});

router.use('/', schoolRoutes);

module.exports = router;
