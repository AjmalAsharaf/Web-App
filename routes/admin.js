var express = require('express');
const { NotFound } = require('http-errors');
const adminHelpers = require('../helpers/admin-helpers');
var router = express.Router();
const userHelper=require('../helpers/user-helpers')



/* GET users listing. */

router.get('/', function (req, res) {

  if(req.session.adminTrue){

  adminHelpers.showAllUsers().then((user) => {

    res.render('admin-home', { user })
  })


  }else{
    res.redirect('/')
  }
})
router.get('/logout', function (req, res) {
  req.session.destroy()
  res.redirect('/')
})
router.get('/delete-product/:id', (req, res) => {
  let proId = req.params.id
  if(req.session.adminTrue){
  adminHelpers.deleteUser(proId).then(() => {
    res.redirect('/admin/')
  })
}else{
  res.redirect('/')
}
})
router.get('/edit-product/:id', (req, res) => {
  if(req.session.adminTrue){

  let proId = req.params.id


  adminHelpers.showUserbyId(proId).then((student) => {

    res.render('edit-product', { student })
  })
}else{
  res.redirect('/')
}


})
router.post('/edit-product/:id', (req, res) => {
  let proId = req.params.id
  let userData = req.body
  adminHelpers.updateUser(proId, userData).then(() => {
    res.redirect('/admin')
  })
})

router.post('/search', function (req, res) {
  if(req.session.adminTrue){


  userData = req.body
  console.log(userData, 'serever');
  adminHelpers.userSearch(userData).then((user) => {
    
      console.log('User found');
      res.render('search', { user })
  
     
    
  }).catch(()=>{
    console.log('NOt found');
      
    res.render('no-user')
  })
}else{
  res.redirect('/')
}

})
router.get('/add-user',(req,res)=>{
  if(req.session.adminTrue){
  
  res.render('add-user')
  }
  else{
    res.redirect('/')
  }
})
router.post('/add-user',(req,res)=>{
  userData=req.body
  userHelper.doSignup(userData).then((response)=>{
    if(response.status){
      res.send({user:true})
    }else{
      res.send({user:false})
    }
  })
})

module.exports = router;
