const notFound = (req, res) => {
    return res.status(404).json({
        success: false,
        message: `The requested route was not found.`,
    });
};

export default notFound;