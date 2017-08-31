/**
 * Created by pusti on 20.08.2017.
 */
const multer  = require('multer');
const upload = multer();
const jwt    = require('jsonwebtoken');
const secret = require('./config').secret;

module.exports = (app,apiRoutes) => {
    apiRoutes.post('/authenticate',upload.fields([]),(req,res)=>
        require('./authenticate')(req.body,res)
    );
    apiRoutes.use(function(req, res, next) {
        let token = req.headers['authorization'];
        if (token) {
            jwt.verify(token, secret, function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    });
    apiRoutes.get('/content', (req,res) =>
        require('./content')(req.decoded,res)
    );
    app.use('/api', apiRoutes);
};
