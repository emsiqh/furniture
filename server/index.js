const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const app = express()
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "20112001",
    database: 'crudreact'
})

app.use(bodyParser.urlencoded({ extended: true }));

// Kết nối đến MySQL
db.connect((err) => {
    if (err) throw err;
    console.log('Kết nối thành công!');
});

app.get('/', (req, res) => {
    // const sqlInsert = "INSERT INTO accounts (username, password) VALUES ('emsiqh', '123456');";
    // db.query(sqlInsert, (err, result) => {
    //     res.send('Hello, ' + result);
    // });
    res.send('Hello');
});

app.get('/api/data', (req, res) => {
    const sqlSelect = "SELECT * FROM products;";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.post('/api/insert', (req, res) => {
    const sqlInsert = "INSERT INTO accounts (username, password) VALUES (?, ?);";

});


app.listen(3000, () => {
    console.log('running on port 3000');
});