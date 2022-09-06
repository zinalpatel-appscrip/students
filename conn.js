require('dotenv').config()


const { MongoClient } = require('mongodb')
const url = process.env.CONNECTION_URL
const client = new MongoClient(url)

async function dbConnect(collectionName) {
    try{
        let result = await client.connect()
        let db = result.db('studentsAPI')
        return db.collection(collectionName)
        // console.log(db)
        // console.log(`Database connected -- ${dbName}`)
    }catch(e)
    {
        console.log(e)
    }
}

// const dbObj = dbConnect()

module.exports = dbConnect