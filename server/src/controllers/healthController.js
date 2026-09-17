import process from "node:process";

const getHealth = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Authentication API is running",
        environment : process.env.NODE_ENV || "development",
    });
};

export { getHealth };