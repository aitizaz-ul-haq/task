const { json } = require("body-parser");

const userRoutes = (app, fs) => {
    // variables
    const dataPath = './data/data.json';

    // helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }
            callback(returnJson ? JSON.parse(data) : data);
        });
    };


    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {
        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }
            callback();
        });
    };


    // get all pokemon from file
    app.get('/pokemon', (req, res) => {
        const pageSize = req.query.pageSize;
        const pageNumber = req.query.pageNumber;
        console.log(pageNumber, pageSize);
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            // res.send(data);
            const response = paginationMethod(JSON.parse(data), pageNumber, pageSize);
            console.log(response);
            res.send(response);
        });
        // console.log(readData);
        // const page = parseInt(req.query.page)
        // const limit = parseInt(req.query.limit)
        // const startIndex = (page - 1) * limit
        // const endIndex = page * limit
        // const result = readData.slice(startIndex, endIndex)
        // res.send(result);

    });


    // get specific pokemon from db
    app.get('/pokemon/:id', (req, res) => {
        readFile(data => {
            const userId = req.params["id"];
            const numid = parseInt(userId, 10);
            const foundValue = data.filter(obj => obj.id === numid);
            res.send(foundValue);
        },
            true);
    });

    // get specific pokemon from file by name
    app.post('/pokemon/search', (req, res) => {
        const searchStr = req.body.name;
        console.log(searchStr);
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }


            const dataArr = JSON.parse(data);
            let anArr = [];
            dataArr.forEach((element, index) => {
                console.log(element);
                if (element.Name === searchStr) {
                    anArr.push(dataArr[index]);
                }
            });

            res.send(anArr);


        });

    });


};



function paginationMethod(items, page, per_page) {

    var page = page || 1,
        per_page = per_page || 10,
        offset = (page - 1) * per_page,

        paginatedItems = items.slice(offset).slice(0, per_page),
        total_pages = Math.ceil(items.length / per_page);
    return {
        page: page,
        per_page: per_page,
        pre_page: page - 1 ? page - 1 : null,
        next_page: (total_pages > page) ? page + 1 : null,
        total: items.length,
        total_pages: total_pages,
        data: paginatedItems
    };
}




module.exports = userRoutes;