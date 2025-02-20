function middleware(req, res, next) {
    res.customData = "This MIDDLE WEAR is custom data";
    next();
}

module.exports = middleware;
