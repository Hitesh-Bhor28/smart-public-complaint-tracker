// ============================================================
// AUTH MIDDLEWARE PLACEHOLDER
// TODO: Integrate Clerk SDK for token verification
// npm install @clerk/clerk-sdk-node
// ============================================================

const protect = (req, res, next) => {
    // TODO: Verify Clerk session token from Authorization header
    // const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");
    // Use ClerkExpressRequireAuth() for production
    console.warn("⚠️  Auth middleware is a placeholder — no authentication enforced");
    next();
};

const adminOnly = (req, res, next) => {
    // TODO: Check if the authenticated user has an admin role
    console.warn("⚠️  Admin-only middleware is a placeholder — no role check enforced");
    next();
};

module.exports = { protect, adminOnly };
