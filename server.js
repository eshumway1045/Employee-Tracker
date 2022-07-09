const express = require('express');
const db = require('./db/connection');
const Construction = require('./index');

const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', apiRoutes);


app.use((req, res) => {
    res.status(404).end();
});

db.connect(err => {
    if (err) throw err;
    console.log('database connected');
    app.listen(PORT, () => {
        console.log(`Server Running on port ${PORT}`);
        // this is more for ease of use, it will start the script right after connecting to the database
        new Build().initialize();
    });
});