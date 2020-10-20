window.addEventListener('load', () => {
    //posts the good memories from the good memory button
    document.getElementById('button-good').addEventListener('click', () => {
        let goodMemory = document.getElementById('good-memories').value;
        console.log(goodMemory);

        let obj = {"memory" : goodMemory};
        //stringify the data. server will parse and convert the string back into json object
        let jsonData = JSON.stringify(obj);

        //make a fetch request of type POST so that we can send input to the server
        fetch('/goodMemories', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: jsonData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        }) 
    })

    document.getElementById('get-happy-tracker').addEventListener('click', () => {
        fetch('getGoodMemories')
        .then(resp => resp.json())
        .then(data => {
            document.getElementById('happy-info').innerHTML = '';
            console.log(data.data);
            for (let i=0; i< data.data.length; i++) {
                let string = data.data[i].date + " : " + data.data[i].memory;
                let element = document.createElement('p');
                element.innerHTML = string;
                document.getElementById('happy-info').appendChild(element);
            }
        })
    })

    document.getElementById('button-bad').addEventListener('click', () => {
        let badMemory = document.getElementById('bad-memories').value;
        console.log(badMemory);

        let obj2 = {"memory" : badMemory};
        //stringify the data. server will parse and convert the string back into json object
        let jsonData = JSON.stringify(obj2);

        //make a fetch request of type POST so that we can send input to the server

        fetch('/badMemories', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: jsonData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        }) 
    })

    document.getElementById('get-bad-tracker').addEventListener('click', () => {
        fetch('getBadMemories')
        .then(resp => resp.json())
        .then(data => {
            document.getElementById('bad-info').innerHTML = '';
            console.log(data.data);
            for (let i=0; i< data.data.length; i++) {
                let string = data.data[i].date + " : " + data.data[i].memory;
                let element = document.createElement('p');
                element.innerHTML = string;
                document.getElementById('bad-info').appendChild(element);
            }
        })
    })
})

