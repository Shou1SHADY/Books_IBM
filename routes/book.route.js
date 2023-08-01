var express = require('express')
var bookCtrl = require('../controller/book.controller');
const router = express.Router();
var queries = require('../config/queries');
var dbConnection = require('../config/connection');
const jwt = require('jsonwebtoken');



const secretKey = 'your_secret_key_here';

user = {};

// Middleware to verify JWT token for authorized access
function authenticateToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        // return res.redirect('/login');
        return res.sendStatus(401);
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            //   return res.redirect('/login');
            return res.sendStatus(403);
        }

        req.user = user;
        next();
    });
}


// API endpoint for user login and issue JWT token
router.post('/login', async (req, res) => {
    // console.log("dddddddddddddddddddddddddddddddddddddddddddddddddddddddd")
    const { username, password, browserToken = "nulll" } = req.body;
    if (!username || !password) {
        // res.redirect('/login');
        return res.status(401).send({ error: ' store name and Addess mandatory' });
    }
    let check = queries.queryList.GET_USERS;
    checkedValues = [browserToken];
    try {
        // Check if the username is already taken
        let auth = await dbConnection.query(check, checkedValues)

        if (auth.rows.length === 0) {
            // res.redirect('/login');
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
    }
    catch (e) {

        console.log(e);
    }

    // Create and sign JWT token
    const token = jwt.sign({ username }, secretKey);
    // res.redirect('/books');
    return res.status(200).json({ token });
});


// API endpoint for user signup
router.post('/signup', async (req, res) => {
    const { username, password, browserToken = "nulll" } = req.body;

    if (!username || !password) {

        return res.status(401).send({ error: ' store name and Addess mandatory' });

    }

    try {
        let check = queries.queryList.GET_USERS;
        checkedValues = [browserToken];

        // Check if the username is already taken
        let auth = await dbConnection.query(check, checkedValues)


        if (auth.rows.length === 0) {

            let queryV = queries.queryList.SAVE_USER;
            const token = jwt.sign({ username }, secretKey);
            values = [username, password, token];
            await dbConnection.query(queryV, values);
            // res.redirect('/books');
            return res.status(201).send({ message: 'User created successfully.', token });
        }
        else {
            // res.redirect('/login');
            return res.status(409).send({ error: "User already exists" });
        }

    }
    catch (e) {
        //res.redirect('/login');
        return res.status(501).send({ error: "could not authorize the new user" });
    }

});


router.get('/books', authenticateToken, bookCtrl.getBookList);
router.get('/books/author/:author', authenticateToken, bookCtrl.getBookListByAuthor);
router.get('/books/isbn/:isbn', authenticateToken, bookCtrl.getBookListByIsbn);
router.get('/books/title/:title', authenticateToken, bookCtrl.getBookListByTitle);
router.post('/books/save', authenticateToken, bookCtrl.saveBookQuery);
router.get('/books/details/:bookId', authenticateToken, bookCtrl.getBookDetails);
router.put("/books/update", authenticateToken, bookCtrl.updateBookQuery);
router.delete('/books/delete/:bookId', authenticateToken, bookCtrl.deleteBook);
router.put('/books/deleting-on-client', authenticateToken, bookCtrl.deleteBookClient);
module.exports = router; 