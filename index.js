let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json());

//DB code for good storage
let Datastore = require('nedb');
let db = new Datastore('goodMemory.db');
db.loadDatabase();

let dbBad = new Datastore('badMemory.db');
dbBad.loadDatabase();

let today = new Date();
let newDate = today.toDateString();

// let goodMemories = [];
// let badMemories = [];
// app.get('/', (req, res) => {
//     res.send('this is the main page');
// })

//need to add a route to server that listens for a POST request for good memories
app.post('/goodMemories', (req, res) => {
    console.log(req.body);
    // let currentDate = Date();
    let obj = {
        date: newDate,
        memory: req.body.memory
    }
//insert memory into the memory database
    db.insert(obj, (err, newDocs) => {
        if(err) {
            res.json({task:"task failed"})
        } else {
        res.json({task:"success"});
        }
    })

})

//add route to get all logged good memory info
app.get('/getGoodMemories', (req, res) => {

    db.find({}, (err, docs)=> {
        if(err) {
            res.json({task:"task failed"})
        } else {
            console.log(docs)
            let obj = {data: docs};
            res.json(obj);
        }
    })

})

//route to server that listens for POST request for bad memories
app.post('/badMemories', (req, res) => {
    console.log(req.body);
    // let currentDate = Date();
    let obj2 = {
        date: newDate,
        memory: req.body.memory
    }

    //insert memory into the memory database
    dbBad.insert(obj2, (err, newDocs) => {
        if(err) {
            res.json({task:"task failed"})
        } else {
        res.json({task:"success"});
        }
    })
  
})

//add route to store all logged bad memories
app.get('/getBadMemories', (req, res) => {
    dbBad.find({}, (err, docs)=> {
        if(err) {
            res.json({task:"task failed"})
        } else {
            console.log(docs)
            let obj2 = {data: docs};
            res.json(obj2);
        }
    })
})

//routes for trashing bad memories
app.post('/trashBadMem', (req, res) => {
    console.log(req.body);
})

app.get('/trashedBadMem', (req, res) => {
    dbBad.remove({}, {multi: true}, (err, numRemoved)=> {
        if(err) {
            res.json({task:"task failed"})
        } else {
            console.log(numRemoved)
            let obj2 = {data: numRemoved};
            res.json(obj2);
        }
    })
})


app.use('/', express.static('public'));

app.listen(5000, () => {
    console.log('listening at localhost:5000');
})