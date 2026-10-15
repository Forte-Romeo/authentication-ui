const errorHandler = (err, req, res, next) => {
    void req;
    void next;

    const candidateStatusCode = err.statusCode ?? err.status;

    const statusCode =
        Number.isInteger(candidateStatusCode) &&
        candidateStatusCode >= 400 &&
        candidateStatusCode <= 599
            ? candidateStatusCode
            : 500;

    if (statusCode >= 500) {
        console.error("Unhandled server error:", err);
    }

    let message;

    if (statusCode >= 500) {
        message = "Internal server error";
    } else if (err.type === "entity.parse.failed") {
        message = "Invalid JSON request body.";
    } else {
        message = err.message || "Request could not be processed.";
    }

    return res.status(statusCode).json({
        success: false,
        message,
    });
};

export default errorHandler;