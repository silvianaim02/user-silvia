const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const port = 3000

const users = [
    { 
        id: 1,
        username: 'silvianaim',
        password: 'Password123',
        isFinished: true
    },
    { 
        id: 2,
        username: 'naimsilvia',
        password: '123Password',
        isFinished: true
    }

]


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


// read user
app.get('/user', (req, res) => {
    res.json(users)
})

// read user
app.get('/user/:id', (req, res) =>  {
    let result = null;

    for (let i = 0; i < users.length; i++) {
        if (users[i].id == req.params.id) {
            result = users[i]
        }
    }

    if (!result) {
        res.sendStatus(404)
    } else {
        res.json(result)
    }
})

// create user
app.post('/user', (req, res) => {
    users.push(req.body)

    res.json({ message: 'data created' })
})

// update user
app.patch('/user/:id', (req, res) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == req.params.id) {
            users[i].isFinished = req.body.isFinished
        }
    }

    res.json({ message: 'data updated' })
})

// delete user
app.delete('/user/:id', (req, res) => {
    let index = null;

    for (let i = 0; i < users.length; i++) {
        if (users[i].id == req.params.id) {
            index = [i]
        }
    }

    users.splice(index, 1)

    res.json({ message: 'data deleted' })
})

app.listen(port, () => {
    console.log('Listening in port: ', port)
})