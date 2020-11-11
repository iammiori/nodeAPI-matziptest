const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.use(bodyParser.json());

// 몽고 디비 연결
const mongoose = require('mongoose')
var db = mongoose.connection;
mongoose.connect('mongodb://localhost:27017/KFood', {
    //useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected...'))
.catch(error => console.log(error))

app.get('/', (req, res) => res.send('Develog!'))


// kfood 데이터 모델
var Schema = mongoose.Schema;

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
})

module.exports = mongoose.model('kfood',kfoodSchema);

var kfoodDatas = mongoose.model('kfood',kfoodSchema);


app.get('/kfood',(req,res) => {
    kfoodDatas.find(function(err,kfood){
        if (err){
            console.log("kfood err"+err);
        } else {
            //res.send("kfood API");
            res.json(kfood);
        }
    })

});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))