// 파라미터 app , db 부를 변수(크게 이름은 상관 없는듯)
module.exports = function(app,kfoodDatas)
{
    app.get('/kfood',(req,res) => {
        kfoodDatas.find(function(err,kfood){
            if (err){
                console.log("kfood err"+err);
            } else {
                //res.render("kfood API");
                return res.json(kfood);
            }
        })
    
    });
}