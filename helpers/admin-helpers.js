const db=require('../config/connection')
const bcrypt=require('bcrypt')
var objectId=require('mongodb').ObjectID
const { response } = require('express')

module.exports={
    showAllUsers:function(){
        return new Promise (async(resolve,reject)=>{
            let student=await db.get().collection('user').find({admin:false}).toArray()
            resolve(student)
        })
    },
    deleteUser:function(proId){
        return new Promise ((resolve,reject)=>{
            db.get().collection('user').removeOne({_id:objectId(proId)}).then((response)=>{
                resolve(response)
            })
        })
    },
    showUserbyId:function(proId){
        console.log(proId,'mongo');
        return new Promise (async(resolve,reject)=>{
           let student=await db.get().collection('user').findOne({_id:objectId(proId)}).then((response)=>{
            resolve(response)
           })
          
           
        })
    },
    updateUser:function(proId,data){
        return new Promise ((resolve,reject)=>{
            db.get().collection('user').updateOne({_id:objectId(proId)},{
                $set:{
                    userName:data.userName,
                    name:data.name
                }
            }).then((response)=>{
                resolve(response)
            })
        })
        
    },
    userSearch: function(userData){
        console.log(userData,'mongo recieved');
        return new Promise (async (resolve,reject)=>{
            let user=await db.get().collection('user').findOne({name:userData.name})
            if(user){
                resolve(user)
            }else{
                reject()
            }
        })
    }
    
}