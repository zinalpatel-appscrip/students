const dbConnect = require("../db/conn")
let md5 = require('md5')
const jwt = require('jsonwebtoken')

module.exports = {
    
    login: async function name(req,h) {
        //check if email exists in db
        const db = await dbConnect('studentAdmin')
        const isEmailExists = await db.find({email: req.payload.email}).toArray()
        if(isEmailExists.length)
        {
            //check if password is correct
            req.payload.password = md5(req.payload.password) 
            const user = await db.find({ email: req.payload.email , password: req.payload.password }).toArray()
            if (user.length) {
                const token = await generateToken(user)
                return ({ message: 'Logged In!', token: token })
            }
            else
                return 'Invalid Credentials!!!'
        }
        else   
            return 'Invalid Credentials!!!'
    },

}

async function generateToken(user) {

    const random_access_token = Math.random().toString(36).substr(2)
    try{
        const payload = {
            user: user[0]._id,
            date: Date(),
            access_token: random_access_token
        }
    
        //save payload
        const db = await dbConnect('auth')
        db.replaceOne(
                {user: user[0]._id},
                {
                    user: user[0]._id,
                    date: Date(),
                    access_token: random_access_token
                },
                {upsert: true}            
        )
    
        return jwt.sign({ payload }, process.env.SECRET_KEY, {
            expiresIn: 3 * 60 * 60
        })
    }
    catch(e)
    {
        console.log(e)
    }
}