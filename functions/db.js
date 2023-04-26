const fs = require("fs");
const db = 'data.json';
let data = JSON.parse(fs.readFileSync(db));

const updateCount = (cmd) => {
    data.cmdCounter[cmd]++;
    fs.writeFileSync(db, JSON.stringify(data));
}

const forceFileUpdate = () => {
    fs.writeFileSync(db, JSON.stringify(data));
}

const refreshData = () => {
    data = JSON.parse(fs.readFileSync(db));
}

module.exports = {
    updateCount: updateCount,
    forceFileUpdate: forceFileUpdate,
    refreshData: refreshData,
    data: data
}