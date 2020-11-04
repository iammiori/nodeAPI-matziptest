module.exports = function(router){
    router.get('/', function(req, res){
       res.render('index');
    });

    router.get('/signup', function(req, res) {
        res.render('adduser');
    });
    //var userName;
    router.post('/adduser', function(req, res){ 
        //post : 주소, html바디 변수 요청, get :일반
        //userName = req.body.name;
        var database = req.app.get('database');
        var newUser = new database.UserModel({
            'user_id': req.body.id,
            'password': req.body.password,
            'name': req.body.name,
            'email': req.body.email
        });

        newUser.save(function(err){
            if(err) throw err;
            res.render('finish');
        });

        console.log(req.body);
    });

    router.get('/viewuser', function(req,res)
    {
        console.log('viewuser 요청됨');
        var database = req.app.get('database');
        database.UserModel.find({},function(err,result){
                res.render('user_view',{user:result})

        })
    });
    //회원정보 수정 change.ejs
    router.get('/changeUser',function(req,res){
        console.log('/change.ejs connect');
        res.render('change');
    });

    router.post('/changeUser',function(req,res){
        var database = req.app.get('database');
        // db에서 검색 알고리즘
        database.UserModel.findOne({
            'user_id': req.body.user_id //아이디 검색
        }, function(err,result){
            if(!result)//안찾아지면
                res.render('fail');
            else{
                result.name = req.body.uname;
                result.email = req.body.email;
                result.save(function(err){
                    console.log('성공!');
                    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                    res.write('success');
                    res.end();
                })
            }
        })
    });

    //main ; login.ejs
    router.get('/main',function(req,res){
        console.log('/login.ejs connect');
        res.render('login');
    });

    router.get('/delete',function(req,res){
        console.log('delete.ejs connect');
        res.render('delete');
    });

    router.post('/main',function(req,res){
        console.log('/login connect');
        var database = req.app.get('database');
        var paramId = req.body.userId; //login.ejs body input 태그 name
        var paramPwd = req.body.userPWd; //``

        database.UserModel.findOne({
            'user_id': paramId
        }, function(err, result){
            if(err) res.render('fail');
            if(!result)
                res.render('fail');
            else{
                if(paramPwd==result.password)
                    res.render('success', {user:result});
                else
                    res.render('fail');
            }
        });
        /*
        database.UserModel.find({"user_id" : req.body.userId, "password" : req.body.userPWd},function(err,docs){
            if (err){
                callback(err,null);
                return;
            }

            if (docs.length > 0){
                console.log(docs);
                var username = docs[0].name;
                console.log('아이디 [%s] 비밀번호 [%s] 사용자 찾음',req.body.userId,req.body.userPWd);
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>환영합니다  ' + paramId + ' 님</h1>');
                res.write('<div><p>사용자 아이디 : ' + paramId + '</p></div>');
                res.write('<div><p>사용자 비밀번호 : ' + paramPwd + '</p></div>');
               // res.write('<div><p>사용자 이름 : ' + database.UserModel.find({"name":{$elemMatch:{"user_id":req.body.userId}}}) + '</p></div>');
                res.write('<div><p>사용자 이름 : ' + username + '</p></div>');
                res.end();
            }else{
                console.log('사용자 없음');
                res.render('fail');
            }

        });
        */

    });

    router.post('/delete',function(req,res){
        var database = req.app.get('database');

       database.UserModel.findOne({
           'user_id': req.body.id
       }).remove(function(err){
            if (err) //에러일때임. 아이디 비교 아님
                console.log('실패');
            else
                console.log('성공');

       })
    })
};
