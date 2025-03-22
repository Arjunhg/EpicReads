const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.get('/auth/me', (req, res) => {
    const token = req.cookies.authToken;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                message: "Invalid Token"
            });
        }
        res.status(200).json({
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });
    });
});

module.exports = router;