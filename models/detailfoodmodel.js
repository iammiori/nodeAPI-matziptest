  
// create detailfood schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 스키마 변수명
// var like = new Schema({
//     uid: String
// });
var detailfoodSchema = new Schema({
    result : 
    {
    menuName : String,
    menuPrice : Number,
    likes : [],

    sid : String,
    link : String,
    tel : String,
    storeLon : Number,
    storeLat : Number
    }
});

//mongoose.model('디비상 콜렉션 이름', 스키마 변수명)
module.exports = mongoose.model('detailfoods', detailfoodSchema);


// var likeModel = new Object();
// likeModel.uid = ""

// detailfoodSchema.push(likeModel);