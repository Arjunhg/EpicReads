const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    
    // const authHeader = req.headers["authorization"]; for localStorage flow
    // const token = authHeader && authHeader.split(" ")[1]; for localStorage flow

    const token = req.cookies.authToken; // for cookie flow
    

    if(!token){
        return res.status(401).json(
            {
                message: "Unauthorized"
            }
        )
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err){
            return res.status(403).json(
                {
                    message: "Forbidden"
                }
            )
        }
        req.user = user;
        next();
    })
}

module.exports = authenticateToken;