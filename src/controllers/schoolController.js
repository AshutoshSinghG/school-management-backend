const { pool } = require('../config/db');
const { calculateDistance } = require('../utils/distance');
const AppError = require('../utils/AppError');

const addSchool = async (req, res, next) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        const [result] = await pool.execute(
            'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
            [name, address, parseFloat(latitude), parseFloat(longitude)]
        );

        const [rows] = await pool.execute('SELECT * FROM schools WHERE id = ?', [result.insertId]);

        res.status(201).json({
            success: true,
            message: 'School added successfully',
            data: rows[0],
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return next(new AppError('A school with this information already exists', 409));
        }
        next(error);
    }
};

const listSchools = async (req, res, next) => {
    try {
        const userLat = parseFloat(req.query.latitude);
        const userLon = parseFloat(req.query.longitude);

        const [schools] = await pool.execute('SELECT * FROM schools ORDER BY created_at DESC');

        const schoolsWithDistance = schools.map((school) => ({
            ...school,
            distance_km: calculateDistance(userLat, userLon, school.latitude, school.longitude),
        }));

        schoolsWithDistance.sort((a, b) => a.distance_km - b.distance_km);

        res.status(200).json({
            success: true,
            count: schoolsWithDistance.length,
            data: schoolsWithDistance,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { addSchool, listSchools };
