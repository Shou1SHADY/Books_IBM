var pool = require("./pool");



// promise


exports.query = (queryText, queryValue) => {

    return new Promise((resolve, reject) => {

        pool.query(queryText, queryValue)
            .then(res => {
                console.log("success")
                resolve(res);
                //    console.log(res);
            })
            .catch(e => {
                console.log("error" + e)
                reject(e);

            })


    })

}


