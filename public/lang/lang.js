/**
 * Created by a4p2 on 4/10/2017.
 */
var Localize = require('localize');
var myLocalize = new Localize({
    "Invalid Name": {
        "en": "Invalid Name",
        "ar": "الاسم غير صحيح"
    },
    "Invalid ID":{
        "en": "Invalid ID",
        "ar": "المسلسل غير صحيح"
    },
    "Invalid Password":{
        "en": "Invalid Password",
        "ar": "تحقق من كلمة المرور"
    },
    "Invalid Status":{
        "en": "Invalid Status",
        "ar": "تحقق من حالة الطلب"
    },
    "Invalid Payment":{
        "en": "Invalid Payment",
        "ar": "تحقق من طريقة الدفع"
    },
    "Invalid Date":{
        "en": "Invalid Delivery Date",
        "ar": "تحقق من تاريخ التسليم "
    },
    "Invalid Quantity":{
        "en": "Invalid Quantity",
        "ar": "تحقق من الكمية"
    },
    "Invalid Price":{
        "en": "Invalid Price",
        "ar": "سعر غير صحيح"
    },
    "Authentication Faild":{
        "en": "Authentication Faild",
        "ar": "الرجاء التحقق من البيانات"
    }
});
module.exports = myLocalize;