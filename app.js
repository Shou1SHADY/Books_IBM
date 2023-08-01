//CHECK book.route.js  file in routes folder to see all the APIS

var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const axios = require('axios');

var app = express()
var baseUrl = 'http://localhost:8000/api/v1'
var bookRoute = require('./routes/book.route');



process.on('unhandledRejection', (err) => {
    console.error('Unhandled promise rejection:', err);
    // Handle the error or take necessary action
    process.exit(1); // Exit the process with a non-zero exit code
});


/////////////////////////////TESTING/////////////////////////////
async function getBooksByISBN(isbn) {
    try {
        const response = await axios.get(`${baseUrl}/books/isbn/:${isbn}`, {
            headers: {
                Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoYWR5IiwiaWF0IjoxNjkwODkyMTE0fQ.veX0mv16s2_PhpQmn65Zp4I9F7pMPIH4ydY-4J66f1s",
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching books by ISBN');
    }
}


async function getBooksByAuthor(author) {
    try {
        const response = await axios.get(`${baseUrl}/books/author/:${encodeURIComponent(author)}`, {
            headers: {
                Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoYWR5IiwiaWF0IjoxNjkwODkyMTE0fQ.veX0mv16s2_PhpQmn65Zp4I9F7pMPIH4ydY-4J66f1s",
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching books by author');
    }
}



async function getBooksByTitle(title) {
    try {
        const response = await axios.get(`${baseUrl}/books/title/:${encodeURIComponent(title)}`, {
            headers: {
                Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoYWR5IiwiaWF0IjoxNjkwODkyMTE0fQ.veX0mv16s2_PhpQmn65Zp4I9F7pMPIH4ydY-4J66f1s",
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching books by title');
    }
}

/////////////////////////////TESTING/////////////////////////////
app.use(cors())


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


/////////////////////////////TESTING/////////////////////////////

async function getBookList() {

    try {
        const response = await axios.get(`${baseUrl}/books`, {
            headers: {
                Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoYWR5IiwiaWF0IjoxNjkwODkyMTE0fQ.veX0mv16s2_PhpQmn65Zp4I9F7pMPIH4ydY-4J66f1s",
            },
        });
        return response.data;
    } catch (error) {
        console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
        throw error;
    }

}




//////////////////////////////////////////////////////////////////


app.get('/', (req, res) => {
    res.send('Express Hello World!')
})


app.use("/api/v1", bookRoute)
app.listen(8000, function () {
    console.log('CORS-enabled web server listening on port 8000')
})

getBookList();
getBooksByAuthor("shady");
