/**
 * Simple logging utility for CrowdFix server.
 * Replace with winston or pino for production use.
 */

const logger = {
    info: (message, ...args) => {
        console.log(`[INFO]  ${new Date().toISOString()} — ${message}`, ...args);
    },
    warn: (message, ...args) => {
        console.warn(`[WARN]  ${new Date().toISOString()} — ${message}`, ...args);
    },
    error: (message, ...args) => {
        console.error(`[ERROR] ${new Date().toISOString()} — ${message}`, ...args);
    },
};

module.exports = logger;
