const dbConnect = require('../db/conn')

module.exports = {
    insertStudentInfo: async (req,res) => {
        try {
            const db = await dbConnect('studentInfo')

            const result = await db.insertMany([req.payload])
            
            if (result.acknowledged) {
                return res.response('Created!').code(201)
            }
            
        } catch (e) {
            console.log(e)
        }
    }
}