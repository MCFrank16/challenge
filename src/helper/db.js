const sqlite3 = require('sqlite3');
const path = require('path');
const { open } = require('sqlite');
const { createTableApplications, createTableUsers } = require('../helper/queries');

const db = {};

(async() => {
    try {
        const d = await open({
            filename: path.join(__dirname, '../assets', 'database.db'),
            driver: sqlite3.Database
        })
        await d.exec(createTableApplications);
        await d.exec(createTableUsers);       
        db.database = d;
    } catch(err) {
        console.debug(err);
    }
})();

module.exports = db;