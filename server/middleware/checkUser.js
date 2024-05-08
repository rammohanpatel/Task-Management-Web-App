import jwt from 'jsonwebtoken';

const secret = 'taskmanagementsystem';

const checkUser = (req, res, next) => {
    const token = req.headers.authtoken;
    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'Unauthorized' });
            }
            else {
                req.body.decodedToken = decodedToken;
                next();
            }
        })
    }
}

export default checkUser;