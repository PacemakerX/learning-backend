function authenticate(req, res, next) {
    res.statusCode = 401;
    res.send("You are not authenticated");
    // Do not call next() if the user is not authenticated
}

// Export the middleware function
module.exports = authenticate;
