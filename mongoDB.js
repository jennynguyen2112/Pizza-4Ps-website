
let {MongoClient} = require ('mongodb');
const uri = 'mongodb+srv://huongnguyenlinh96:sFz45k9dtwR9LKEy@pizza4p.ki278ug.mongodb.net/?retryWrites=true&w=majority&appName=Pizza4P';
let client;

async function connect() {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
    }
    return client;
}

async function findMenuItems(searchTerm) {
    const client = await connect();
    const results = await client.db("Pizza4P").collection("menuItems").find({ name: { $regex: searchTerm, $options: 'i' } }).toArray();
    return results;
}

module.exports = {
    findMenuItems
};
