var queries = require('../config/queries');
var dbConnection = require('../config/connection');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var util = require('../Util/utility');


exports.getBookList = async (req, res) => {

    try {
        var bookListQuery = queries.queryList.GET_BOOK_LIST_QUERY;
        var result = await dbConnection.query(bookListQuery);
        return res.status(200).send(JSON.stringify(result.rows));
        //result.rows
    }

    catch (e) {
        console.log("ERROR  " + e);
        return res.status(500).send({ error: 'Fialed to list books' });
    }



}

exports.getBookListByAuthor = async (req, res) => {

    try {
        const { author } = req.params;
        var bookListQuery = queries.queryList.GET_BOOK_LIST_QUERY_AUTHOR;
        var result = await dbConnection.query(bookListQuery, [author]);
        return res.status(200).send(JSON.stringify(result.rows));
        //result.rows
    }

    catch (e) {
        console.log("ERROR  " + e);
        return res.status(500).send({ error: 'Fialed to list books' });
    }



}

exports.getBookListByIsbn = async (req, res) => {

    try {
        const { isbn } = req.params;
        var bookListQuery = queries.queryList.GET_BOOK_LIST_QUERY_ISBN;
        var result = await dbConnection.query(bookListQuery, [isbn]);
        return res.status(200).send(JSON.stringify(result.rows));
        //result.rows
    }

    catch (e) {
        console.log("ERROR  " + e);
        return res.status(500).send({ error: 'Fialed to list books' });
    }



}


exports.getBookListByTitle = async (req, res) => {

    try {
        const { title } = req.params;
        var bookListQuery = queries.queryList.GET_BOOK_LIST_QUERY_TITLE;
        var result = await dbConnection.query(bookListQuery, [title]);
        return res.status(200).send(JSON.stringify(result.rows));
        //result.rows
    }

    catch (e) {
        console.log("ERROR  " + e);
        return res.status(500).send({ error: 'Fialed to list books' });
    }



}


exports.getBookDetails = async (req, res) => {

    try {
        var bookId = req.params.bookId;
        var bookDetailsQuery = queries.queryList.GET_BOOK_DETAILS_QUERY;
        var result = await dbConnection.query(bookDetailsQuery, [bookId]);
        return res.status(200).send(JSON.stringify(result.rows[0].description));
        //result.rows
    }

    catch (e) {
        console.log("ERROR  " + e);
        return res.status(500).send({ error: 'Fialed to list books' });
    }



}






exports.saveBookQuery = async (req, res) => {



    try {


        var title = req.body.title;
        var isbn = req.body.isbn;
        var description = req.body.description;
        var author = req.body.author;
        var publisher = req.body.publisher;
        var pages = req.body.pages;


        console.log("name ");
        if (!title || !author || !publisher) {
            //lazm tktb return
            return res.status(500).send({ error: ' store name and Addess mandatory' });
        }
        //let storeCode = util.generateStoreCode();
        values = [title, isbn, description, author, publisher, pages]; // nafs tartib el query 
        var saveBookQuery = queries.queryList.SAVE_BOOK_QUERY;
        await dbConnection.query(saveBookQuery, values);
        //  console.log("SLOW DOWN");
        return res.status(201).send("Successs Book save");

    } catch (e) {
        return res.status(500).send({ error: 'Fialed to save books' });
    }



}


exports.updateBookQuery = async (req, res) => {



    try {

        var bookId = req.body.bookId;
        var title = req.body.title;
        var description = req.body.description;
        var author = req.body.author;
        var publisher = req.body.publisher;
        var pages = req.body.pages;



        if (!description) {
            //lazm tktb return
            return res.status(500).send({ error: ' storeCode name and publisher and author and title mandatory update' });
        }
        //let storeCode = util.generateStoreCode();
        values = [title, description, author, publisher, pages, bookId]; // nafs tartib el query 
        var updateBookQuery = queries.queryList.UPDATE_BOOK_QUERY;
        await dbConnection.query(updateBookQuery, values);
        //  console.log("SLOW DOWN");
        return res.status(200).send("Successs Book update");

    } catch (e) {
        return res.status(500).send({ error: 'Fialed to update books' });
    }



}


exports.deleteBook = async (req, res) => {
    try {
        var bookId = req.params.bookId;
        if (!bookId) {
            return res.status(500).send({ error: 'bookId shouas  akakasja ' });
        }
        var updateBookQuery = queries.queryList.DELETE_BOOK_QUERY;
        await dbConnection.query(updateBookQuery, [bookId]);
        return res.status(200).send("Successfullt Book deleted");
    }
    catch (error) {
        return res.status(500).send({ error: 'Fialed to delete books' });
    }


}




exports.deleteBookClient = async (req, res) => {
    try {
        var bookId = req.body.bookId;
        var client = req.body.username;
        values = [bookId, client]
        if (!bookId || !client) {
            return res.status(500).send({ error: 'bookId and username must be provided ' });
        }
        var updateBookQuery = queries.queryList.DELETE_BOOK_QUERY_USER;
        await dbConnection.query(updateBookQuery, values);
        return res.status(200).send("Successfullt Book review by specific client deleted");
    }
    catch (error) {
        return res.status(500).send({ error: 'Fialed to delete books' });
    }


}