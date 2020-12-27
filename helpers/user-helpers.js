const db = require('../config/connection')
const bcrypt = require('bcrypt')
module.exports = {
    doSignup: function (userData) {

        let response = {}
        return new Promise(async (resolve, reject) => {
            console.log('mongo', userData);
            let user = await db.get().collection('user').findOne({ userName: userData.userName })
            console.log(user);
            if (user) {
                resolve(response.status = false)
            } else {
                console.log('mongo password', userData.password);
                userData.password = await bcrypt.hash(userData.password, 10)
                db.get().collection('user').insert({
                    userName:userData.userName,
                    name:userData.name,
                    password:userData.password,
                    admin:false
                }).then((status) => {
                    response.user = user;
                    response.status = true;
                    resolve(response)


                })

            }


        })
    },
    doLogin: function (userData) {
        
        let response = {}
        return new Promise(async (resolve, reject) => {

            let user = await db.get().collection('user').findOne({ userName: userData.userName })
            console.log(user);
            if (user) {
                if (user.admin) {
                    console.log('hello');
                    if (user.password == userData.password) {
                        response.status=true
                        response.user=user
                        response.admin=true
                        resolve(response)
                    }


                } else {
                    bcrypt.compare(userData.password, user.password).then((status) => {
                        if (status) {
                            response.user = user
                            response.status = true
                            resolve(response)
                        } else {
                            response.status = false
                            resolve(response)
                        }
                    })
                }
            } else {
                response.noUser = true;
                resolve(response)
            }
        })
    }
}