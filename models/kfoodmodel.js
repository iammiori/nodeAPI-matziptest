
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 스키마 변수명
var kfoodSchema = new Schema({
    result : 
    {
    storeID : String,
    storeName : String,
    star : Number,
    image : String,
    represent : String 
    },
    isSuccess : Boolean,
    code : Number,
    message : String
});

//mongoose.model('디비상 콜렉션 이름', 스키마 변수명)
module.exports = mongoose.model('kfoods', kfoodSchema);