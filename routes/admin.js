var express = require('express');
const { NotFound } = require('http-errors');
const adminHelpers = require('../helpers/admin-helpers');
var router = express.Router();
const userHelper=require('../helpers/user-helpers')



/* GET users listing. */

router.get('/', function (req, res) {

  adminHelpers.showAllUsers().then((user) => {

    res.render('admin-home', { user })
  })



})
router.get('/logout', function (req, res) {
  req.session.destroy()
  res.redirect('/')
})
router.get('/delete-product/:id', (req, res) => {
  let proId = req.params.id
  adminHelpers.deleteUser(proId).then(() => {
    res.redirect('/admin/')
  })
})
router.get('/edit-product/:id', (req, res) => {
  let proId = req.params.id


  adminHelpers.showUserbyId(proId).then((student) => {

    res.render('edit-product', { student })
  })


})
router.post('/edit-product/:id', (req, res) => {
  let proId = req.params.id
  let userData = req.body
  adminHelpers.updateUser(proId, userData).then(() => {
    res.redirect('/admin')
  })
})

router.post('/search', function (req, res) {

  userData = req.body
  console.log(userData, 'serever');
  adminHelpers.userSearch(userData).then((user) => {
    if (user) {
      res.render('search', { user })
    } else {
      res.redirect('/admin')
    }
  })

})
router.get('/add-user',(req,res)=>{
  res.render('add-user')
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
