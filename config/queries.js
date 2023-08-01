

exports.queryList = {
  GET_USERS: `SELECT jwt  
    FROM book.client 
    WHERE jwt =$1`,
  SAVE_USER: `INSERT INTO book.client (username, pass, jwt) VALUES($1,$2,$3) `,
  GET_STORE_LIST_QUERY: 'SELECT STORE_ID, STORE_NAME, STORE_CODE FROM BMS.STORE',
  GET_BOOK_LIST_QUERY_AUTHOR: `SELECT * FROM book.bookk WHERE author =$1`,
  GET_BOOK_LIST_QUERY_TITLE: `SELECT * FROM book.bookk WHERE title =$1`,
  GET_BOOK_LIST_QUERY_ISBN: `SELECT * FROM book.bookk WHERE isbn =$1`,
  SAVE_STORE_QUERY: 'INSERT INTO BMS.STORE(STORE_NAME, STORE_CODE, CREATED_ON, CREATED_BY, ADDRESS) VALUES($1,$2,$3,$4,$5)',
  GET_BOOK_LIST_QUERY: 'SELECT book_id, title, author, publisher FROM book.bookk',
  GET_BOOK_DETAILS_QUERY: `SELECT book_id, title, description, author, publisher , pages   
FROM book.bookk  
WHERE book_id  =$1` ,
  SAVE_BOOK_QUERY: `INSERT INTO book.bookk (title, isbn,description, author, publisher, pages) VALUES($1,$2,$3,$4,$5,$6)`,
  UPDATE_BOOK_QUERY: `UPDATE book.bookk SET title=$1, description=$2, author=$3, publisher=$4, pages =$5
    WHERE book_id=$6`,
  DELETE_BOOK_QUERY: 'DELETE FROM book.bookk WHERE book_id= $1',

  DELETE_BOOK_QUERY_USER: ` UPDATE book.bookk
SET description  = NULL
FROM client 
WHERE book.bookk.book_id = $1
  AND book.bookk.book_id  = book.client.book_id  
  AND book.client.username  = $2`
}
