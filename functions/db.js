const fs = require("fs");
const db = 'data.json';
let data = JSON.parse(fs.readFileSync(db));

const updateCount = (cmd) => {
    data.cmdCounter[cmd]++;
    fs.writeFileSync(db, JSON.stringify(data));
}
const changePersonal = () => {
    data.personal = !data.personal;
    fs.writeFileSync(db, JSON.stringify(data));
}
const changeGroupOnly =  () => {
    data.groupOnly = !data.groupOnly;
    fs.writeFileSync(db, JSON.stringify(data));
}

const forceFileUpdate = () => {
    fs.writeFileSync(db, JSON.stringify(data));
}

const refreshData = () => {
    data = JSON.parse(fs.readFileSync(db));
}

module.exports = {
    changePersonal: changePersonal,
    changeGroupOnly: changeGroupOnly,
    updateCount: updateCount,
    forceFileUpdate: forceFileUpdate,
    refreshData: refreshData,
    data: data
}
