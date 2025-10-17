export default function errorHandling(err, req, res, next) {
    console.error(err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
}
