const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const dbName = 'quote-calc-db';

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const MONGO_URL = process.env.MONGO_URL;

const dbConnect = (collectionName, callback) => {
    MongoClient.connect(
        MONGO_URL,
        { useUnifiedTopology: true },
        (err, client) => {
            if (err) return console.log(err);

            const db = client.db(dbName);
            const collection = db.collection(collectionName);

            callback(collection);
        }
    );
};

module.exports.getRecord = (id, callback) => {
    if (!ObjectId.isValid(id)) callback();

    dbConnect('quotes', collection => {
        collection.findOne({ _id: new ObjectId(id) }, (err, result) => {
            if (err) return console.log('Error on Get Quote: ' + err);

            callback(result);
        });
    });
};

module.exports.addRecord = (data, callback) => {
    dbConnect('quotes', collection => {
        collection.insertOne(
            {
                AmountRequired: data.AmountRequired,
                Term: data.Term,
                Title: data.Title,
                FirstName: data.FirstName,
                LastName: data.LastName,
                Mobile: data.Mobile,
                Email: data.Email
            },
            (err, result) => {
                if (err) return console.log('Error on Add Record: ${err}');

                callback(result.insertedId);
            }
        );
    });
};

module.exports.updateRecord = (data, callback) => {
    dbConnect('quotes', collection => {
        collection.updateOne(
            { _id: new ObjectId(data.ID) },
            { $set: data },
            err => {
                if (err) return console.log(err);

                callback();
            }
        );
    });
};
