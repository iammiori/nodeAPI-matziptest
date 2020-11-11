const detailfoodmodel = require("../models/detailfoodmodel");

// 파라미터 app , db 부를 변수(크게 이름은 상관 없는듯)
module.exports = function(app,detailfoodDatas)
{
    app.post('/detailfood',(req,res) => {
        var loc = new Object();
        loc.longitude = req.body.longitude;
        loc.latitude = req.body.latitude;
        //detailfoodDatas.find({""})

        detailfoodDatas.findOne({email: req.body.email}).exec()

        .then(() => {


            res.json({result:101});

        })




        .catch(() => {

        })

        return res.json(detailfoodDatas);
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