var express = require('express');
const adminHelpers = require('../helpers/admin-helpers');
var router = express.Router();


/* GET users listing. */

router.get('/',function (req,res){
  adminHelpers.showAllUsers().then((user)=>{
    
    res.render('admin-home',{user})
  })
  
  
  
})
router.get('/logout',function(req,res){
  req.session.destroy()
  res.redirect('/')
})
router.get('/delete-product/:id',(req,res)=>{
  let proId=req.params.id
  adminHelpers.deleteUser(proId).then(()=>{
    res.redirect('/admin/')
  })
})
router.get('/edit-product/:id',(req,res)=>{
  let proId=req.params.id
  
  
  adminHelpers.showUserbyId(proId).then((student)=>{
    
    res.render('edit-product',{student})
  })
  

})
router.post('/edit-product/:id',(req,res)=>{
  let proId=req.params.id
  let userData=req.body
  adminHelpers.updateUser(proId,userData).then(()=>{
    res.redirect('/admin')
  })
})


module.exports = router;
