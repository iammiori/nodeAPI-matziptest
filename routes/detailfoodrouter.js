const detailfoodmodel = require("../models/detailfoodmodel");

// 파라미터 app , db 부를 변수(크게 이름은 상관 없는듯)
module.exports = function(app,detailfoodDatas)
{
    app.post('/detailfood',(req,res) => {
        //var loc = new Object();
        //loc.longitude = req.body.longitude;
        //loc.latitude = req.body.latitude;
        //detailfoodDatas.find({""})

        //uid : 사용자 폰 정보
        //postman 에서 body에 넘겨주면됨
        var uid  = req.body.uid;
  
      
        
        detailfoodDatas.findOne({
            //postman에서 body로 넘겨줘
            // 가게정보 (가게아이디)
            "result.sid" : req.body.sid

        },function(err,detailfood){

           
            if (!detailfood){
                console.log('no store info');
                return res.json({result:1111});
                //throw new Error('promise chain break due to no store info')
            }
            if (err){
                console.log("err"+err);
                return res.json({result: 1111});
            } else {
                //res.render("kfood API");
                console.log("ttibal");

                //var resObj = new Object();
                //detailfoodDatas.findOne({내 uid가 있는지 확인})

                //detailfood.likes = false;
                //detailfood.result.like = uid
                console.log(uid)
                
                //가게아이디 숫자로 변환후 -1 (인덱스로 넣어주기위해)
                idx = Number(req.body.sid)-1
                //console.log(Number(req.body.sid)-1)
                detailfood.result.likes[idx].push(uid);
                //이거 안하면 배열에 쌓이지 않음 꼭해주셈
                detailfood.markModified('result');
                detailfood.save();
           
                //res.json({li})
                //console.log(detailfood.like.length);
                return res.json(detailfood);
            }
        }).exec();

    
    });


}

/*
    result : 
    {
    foodID : String,
    foodName : String,
    price : Number, 
    star : Number,
    image : String,
    },
    isSuccess : Boolean,
    code : Number,
    message : String
});

*/
