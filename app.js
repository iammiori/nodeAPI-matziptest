// app.js

// [LOAD PACKAGES]
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
const multer = require('multer');

// [CONFIGURE SERVER PORT]
var port = process.env.PORT || 3000;

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise; // 비동기를 사용하여 call back함수를 then으로 사용가능.

//foodmap_service DB 연결
mongoose.connect('mongodb://localhost:27017/KFood');

//back-up용
//mongoose.connect('mongodb://Customer:AlomUser20@172.31.46.69:27017/honbab_service', {useNewUrlParser: true});

//connection check
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback (){
    console.log("mongo db connection is OK.");
});

// DEFINE MODEL
// db 모델 정의 부분

/*
 - 한식 조회 API
 - get
*/
var KfoodModel = require('./models/kfoodmodel')

/*
 - 상세메뉴 조회 API
 - post (body 에 위도 경도)
*/
var DetailfoodModel = require('./models/detailfoodmodel')



// [CONFIGURE ROUTER]
// 라우터랑 디비 연결 부분
// 파라미터 app, 위에서 정의한 db 모델
var kfoodRouter = require('./routes/kfoodrouter')(app, KfoodModel);
var detailfoodRouter = require('./routes/detailfoodrouter')(app,DetailfoodModel);

/* ——————————————————————————————————— */



// [RUN SERVER]
var server = app.listen(port, function(){
 console.log("Express server has started on port " + port)
});