var express = require('express');
var app = express();

var pkg_file = require('./package.json');

// db json dummy test
let kfood_db = require('./kfoodDummy.json');

app.get('/test',function(req,res){
    res.send(pkg_file);
})

// 한식조회 API
app.get('/kfood',function(req,res){
    res.send(kfood_db)
})

app.listen(process.env.PORT);

console.log("Running");