export default function logger(req, res, next) {
    console.log(`${new Date().toUTCString()} - ${req.method} - ${req.hostname}`);
    next();
};