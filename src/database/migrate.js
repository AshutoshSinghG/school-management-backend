const { pool } = require('../config/db');

const createSchoolsTable = `
  CREATE TABLE IF NOT EXISTS schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(500) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_coordinates (latitude, longitude)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

const runMigrations = async () => {
    try {
        await pool.execute(createSchoolsTable);
        console.log('✓ Schools table ready');
    } catch (error) {
        console.error('✗ Migration failed:', error.message);
        throw error;
    }
};

if (require.main === module) {
    runMigrations()
        .then(() => {
            console.log('Migrations complete');
            process.exit(0);
        })
        .catch(() => process.exit(1));
}

module.exports = { runMigrations };
