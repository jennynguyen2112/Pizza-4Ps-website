
const {MongoClient} = require ('mongodb');


async function Main() {
    const uri = 'mongodb+srv://huongnguyenlinh96:sFz45k9dtwR9LKEy@pizza4p.ki278ug.mongodb.net/?retryWrites=true&w=majority&appName=Pizza4P';
    const client = new MongoClient(uri);
    try{
        await client.connect();
        await createMultipleListings(client, [
            {
                id: 1,
                name: 'Assorted House-made Cheese',
                image: 'appetizer1.jpg',
                price: 10
            },
            {
                id: 2,
                name: 'Cold Cuts and Cheese Platter',
                image: 'appetizer2.jpg',
                price: 11
            },
            {
                id: 3,
                name: 'Mango Parma Ham Wrap',
                image: 'appetizer3.jpg',
                price: 11
            },
            {
                id: 4,
                name: 'Butternut Pumpkin and Jasmine Milk Tea Potage',
                image: 'appetizer4.jpg',
                price: 13
            },
            {
                id: 5,
                name: 'Seafood Okonomiyaki Pizza',
                image: 'pizza1.jpg',
                price: 15
            },
            {
                id: 6,
                name: 'Burrata Parma Ham',
                image: 'pizza2.png',
                price: 17
            },
            {
                id: 7,
                name: 'House-made 3 Cheese Pizza',
                image: 'pizza3.jpg',
                price: 16
            },
            {
                id: 8,
                name: 'House-made 4 Cheese Pizza',
                image: 'pizz4.jpg',
                price: 16
            },
            {
                id: 9,
                name: 'Arrabbiata with Mascarpone',
                image: 'pasta1.jpg',
                price: 18
            },
            {
                id: 10,
                name: 'Clam & Basil Sauce Spaghetti',
                image: 'pasta2.jpg',
                price: 18
            },
            {
                id: 11,
                name: 'Salmon Cream Fettuccine',
                image: 'pasta3.jpg',
                price: 18
            },
            {
                id: 12,
                name: 'Bolognese Spaghetti',
                image: 'pasta4.jpg',
                price: 18
            }
        ]);
    } catch (err){
        console.error(err);
    }finally{
        await client.close();
    }
}
Main().catch(console.error);

async function createMultipleListings(client, newListings){
    const result = await client.db("Pizza4P").collection("menuItems").insertMany(newListings);

    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);       
}

