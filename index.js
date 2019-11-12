const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_USERS_QUERY = 'SELECT * FROM users';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Andrew123',
    database: 'trashtalk'
});

connection.connect(err => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Connected to mysql server');
    }
});

//console.log(connection);

app.use(cors());

app.get('/', (req, res) => {
    res.send('hello from trashtalk server');

});

app.get('/users/add', (req, res) => {
    const { username, email, organization } = req.query;
    console.log(username, email, organization);
    const INSERT_USERS_QUERY = `INSERT INTO Users (username, email, organization) VALUES ('${username}', '${email}', '${organization}')`
    connection.query(INSERT_USERS_QUERY, (err, results) => {
        if (err) {
            return res.send(err)
        }
        else {
            return res.send('successfully added product')
        }
    })
})

app.get('/users', (req, res) => {
    connection.query(SELECT_ALL_USERS_QUERY, (err, results) => {
        if (err) {
            return res.send(err)
        }
        else{
            return res.json({
                data: results
            })
        }
    })
});
const SELECT_ALL_POSTS_QUERY = 'SELECT * FROM board';

app.get('/posts', (req, res) => {
    connection.query(SELECT_ALL_POSTS_QUERY, (err, results) => {
        if (err) {
            return res.send(err)
        }
        else{
            return res.json({
                data: results
            })
        }
    })
});

app.get('/posts/add', (req, res) => {
    const { username, email, org, message} = req.query;
    console.log(username, email, org, message);
    const INSERT_POST_QUERY = `INSERT INTO board (username, email, org, message) VALUES ('${username}', '${email}', '${org}', '${message}')`
    connection.query(INSERT_POST_QUERY, (err, results) => {
        if (err) {
            return res.send(err)
        }
        else {
            return res.send('successfully added post')
        }
    })
})

app.listen(4000, () => {
    console.log("Trashtalk server listening on port 4000")
});