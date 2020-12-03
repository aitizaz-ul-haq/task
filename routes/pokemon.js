
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


    // get all pokemon from db
    app.get('/pokemon', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            res.send(JSON.parse(data));
        });
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
};

module.exports = userRoutes;