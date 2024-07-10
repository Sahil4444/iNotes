const jwt = require('jsonwebtoken');

const fetchUser =async(req, res, next)=>{
    const JWT_SECRET_KEY = "Trustthe$process";
    try {
        const token = req.header('auth-token');
        if(!token){
            return res.status(401).send("Invalid token!");
        }

        const data = jwt.verify(token, JWT_SECRET_KEY);
        req.user = data.user;
        // res.status(200).send("Token verified.");
        next();

    } catch(err){
        console.log(err.message);
        res.status(500).json({err: "Wrong in fetchUser!"})
    }
}

module.exports = fetchUser;