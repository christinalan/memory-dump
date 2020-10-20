let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json());

//DB code
let Datastore = require('nedb');
let db = new Datastore('memory.db');
db.loadDatabase();

let today = new Date();
let newDate = today.toDateString();

let goodMemories = [];
let badMemories = [];
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

    db.find({"memory" : goodMemory}, (err, docs)=> {
        if(err) {
            res.json({task:"task failed"})
        } else {
            let obj = {data: goodMemories};
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
    db.insert(obj2, (err, newDocs) => {
        if(err) {
            res.json({task:"task failed"})
        } else {
        res.json({task:"success"});
        }
    })
  
})

//add route to store all logged bad memories
app.get('/getBadMemories', (req, res) => {
    db.find({"memory" : badMemory}, (err, docs)=> {
        if(err) {
            res.json({task:"task failed"})
        } else {
            let obj = {data: badMemories};
            res.json(obj);
        }
    })
})


app.use('/', express.static('public'));

app.listen(5000, () => {
    console.log('listening at localhost:5000');
})