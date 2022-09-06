const dbConnect = require('../db/conn')
const validateUser = require('../middleware/validate')
let md5 = require('md5')
const jwt = require('jsonwebtoken')
require('dotenv').config()


module.exports = {
    //Insert Data in studentsAdmin
    insertData: async (req, h) => {
        try {
            let res = 'Error'
            const db = await dbConnect('studentAdmin')
            const isValid = validateUser(req.payload)
            // console.log(isValid.error)

            if (!isValid.error) {
                req.payload.password = md5(req.payload.password) 
                let result = await db.insertOne(req.payload)
                res = result.acknowledged ? "Data Inserted!!" : 'An error occured'
            }
            else {
                res = isValid.error.details
            }

            return res
        }
        catch (e) {
            // if (e.code === 11000)
            //     res.send("This email is already in use")
            // else
            console.log(e)
        }
    }
}