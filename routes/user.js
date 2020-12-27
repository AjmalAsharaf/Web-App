var express = require('express');
var router = express.Router();
const userHelper=require('../helpers/user-helpers')

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user){
    res.redirect('/home')

  }else{
    res.render('login');
  }
  
  
});

router.get('/login',function(req,res){
  if(req.session.user){
    res.redirect('/home')
  }else{
  res.render('login')
  }
})

router.get('/signup',function(req,res){
  res.render('signup')
})

router.post('/signup',function(req,res){
  userData=req.body
  userHelper.doSignup(userData).then((response)=>{
    if(response.status){
      res.send({user:true})
    }else{
      res.send({user:false})
    }
  })
})
router.post('/login',function(req,res){
  userData=req.body
  
  userHelper.doLogin(userData).then((response)=>{
    console.log('server',response);
    if(response.noUser){
      
      res.send({noUser:true})
    }else if(response.status){
      
      req.session.loggedIn=true
      req.session.user=response.user
      if(response.admin){
        console.log('admin here');
        res.send({user:true,admin:true})
      }else{
        console.log('user reached here');

        res.send({user:true,admin:false})
      }

      
      
      
      
    }else{
      res.send({user:false})
      
    }
    
  })
})
router.get('/home',(req,res)=>{
  let user=req.session.user
  if(user){
  console.log('Home',user);

  res.render('home',{user})
  }
  else{
    res.redirect('/')
  }
})
router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})

module.exports = router;
