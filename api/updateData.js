const url = require('url');
const MongoClient = require('mongodb').MongoClient;

let cachedDb = null;

async function connectToDatabase(uri) {

    if (cachedDb) {
        return cachedDb
    }

    const client = await MongoClient.connect(uri, {useNewUrlParser: true});

    const db = await client.db(url.parse(uri).pathname.substr(1));

    cachedDb = db;
    return db
}

module.exports = async (req, res) => {
    const db = await connectToDatabase(process.env.MONGODB_URI);
    const collection = await db.collection('users');

    const userData = req.body.userData;
    const userName = req.body.userName;
    const myQuery = {userName: userName};
    const newValues = {$set: {userName: userName, dates: userData}};

    await collection.updateOne(myQuery, newValues, {upsert: true}, function (err, re) {
        if (err) throw err;

        res.status(200).json(re)
    });
}



