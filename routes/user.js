var express = require('express');
var router = express.Router();
const userHelper=require('../helpers/user-helpers')
const adminHelpers = require('../helpers/admin-helpers');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  if(req.session.user){
    if(req.session.adminTrue){
      adminHelpers.showAllUsers().then((user)=>{
    
        res.render('admin-home',{user})
      })
    }else{
    res.render('home')
    }

  }else{
    res.render('login');
  }
  
  
});

router.get('/login',function(req,res){
  if(req.session.user){
    if(req.session.adminTrue){
      
    }else{
    res.render('home')
    }
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
    if(response.noUser){
      res.send({noUser:true})
    }else if(response.status){
      
      req.session.loggedIn=true
      req.session.user=response.user
      req.session.adminTrue=response.admin
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
  if(req.session.user){
    if(req.session.adminTrue){
      adminHelpers.showAllUsers().then((user)=>{
    
        res.render('admin-home',{user})
      })
    }else{
    res.render('home')
    }

  }else{
    res.render('login');
  }
  
})
router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})

module.exports = router;
