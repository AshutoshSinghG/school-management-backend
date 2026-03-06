const app = require('./src/app');
const env = require('./src/config/env');
const { testConnection, shutdown } = require('./src/config/db');
const { runMigrations } = require('./src/database/migrate');

let server;

const startServer = async () => {
    try {
        await testConnection();
        await runMigrations();

        server = app.listen(env.port, () => {
            console.log(`\n🚀 Server running on port ${env.port} [${env.nodeEnv}]`);
            console.log(`   Health: http://localhost:${env.port}/api/health\n`);
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
};

const gracefulShutdown = async (signal) => {
    console.log(`\n${signal} received — shutting down gracefully`);
    if (server) {
        server.close(async () => {
            await shutdown();
            console.log('Server closed');
            process.exit(0);
        });

        setTimeout(() => {
            console.error('Forced shutdown — timeout exceeded');
            process.exit(1);
        }, 10000);
    }
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('uncaughtException', (error) => {
    console.error('UNCAUGHT EXCEPTION:', error);
    process.exit(1);
});

process.on('unhandledRejection', (error) => {
    console.error('UNHANDLED REJECTION:', error);
    if (server) {
        server.close(() => process.exit(1));
    } else {
        process.exit(1);
    }
});

startServer();
