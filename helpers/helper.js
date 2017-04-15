/**
 * Created by a4p2 on 4/15/2017.
 */
var localize = require('../public/lang/lang');


function errorHandling(errors){
    var error = "";
    for (var i = 0, len = errors.length; i < len; i++) {
        if(i == 0)
        {
            error += errors[i].msg;
        }
        else if(i == len-1)
        {
            error += " "+localize.translate("And")+" "+errors[i].msg;
        }
        else{
            error += " , "+errors[i].msg;
        }
    }
    return error;
}
function errorDbHandling(errors){
    var error = "";
    for (var i = 0, len = errors.length; i < len; i++) {
        if(errors[i].type == "unique violation"){
            error += localize.translate("Duplicate "+errors[i].path);
        }
    }
    return error;
}
module.exports = {
    errorHandling :errorHandling,
    errorDbHandling:errorDbHandling
} ;