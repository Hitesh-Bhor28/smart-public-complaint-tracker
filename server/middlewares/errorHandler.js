const errorHandler = (err, req, res, _next) => {
    console.error("❌ Error:", err.message);

    // Mongoose validation error
    if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json({ success: false, message: messages.join(", ") });
    }

    // Mongoose bad ObjectId
    if (err.name === "CastError") {
        return res.status(400).json({ success: false, message: "Invalid resource ID" });
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        return res.status(400).json({ success: false, message: "Duplicate field value" });
    }

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};

module.exports = errorHandler;
