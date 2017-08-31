/**
 * Created by pusti on 30.08.2017.
 */
const Users = require('./permissions.json').users;
const jwt    = require('jsonwebtoken');
const secret = require('./config').secret;

module.exports = ({name,password} ,res)=>{
    const found = Users.find(elem=> elem.name==name);
    if (!found)
        res.json({ success: false, message: 'Authentication failed. User not found.' });//User not found
    else
        if(found.password!==password)
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });//Wrong Password
        else {
            let token = jwt.sign({name,password}, secret, {
                expiresIn: 1440 // 24 hours
            });
            res.json({
                success: true,
                message: 'Authentication successful',
                username: name,
                token: token
            });
        }
};