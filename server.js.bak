const express = require('express');
const app = express();
const db = require('./db');

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// 메뉴 조회
app.get('/', (req, res) => {
    db.query('SELECT * FROM menus', (err, results) => {
        if (err) throw err;
        res.render('index', { menus: results });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


