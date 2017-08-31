/**
 * Created by pusti on 30.08.2017.
 */
const menu = require('./permissions.json').menu;
module.exports = ({name} ,res)=>{
    const menus =
        menu.filter(elem=>
            elem.allow.some(
                user => user===name
        )).map(elem=> elem.name);
    res.send(menus);
};