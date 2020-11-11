
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 스키마 변수명
var detailfoodSchema = new Schema({
    result : 
    {
    foodID : String,
    foodName : String,
    price : Number, 
    star : Number,
    image : String,
    distance : String
    },
    isSuccess : Boolean,
    code : Number,
    message : String
});

//mongoose.model('디비상 콜렉션 이름', 스키마 변수명)
module.exports = mongoose.model('detailfoods', detailfoodSchema);