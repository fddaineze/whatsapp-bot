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

const changeWhitelist = () => {
    data.whitelistMode = !data.whitelistMode;
    fs.writeFileSync(db, JSON.stringify(data));
}
const addblacklist = (id) => {
    data.blacklist.push(id);
    fs.writeFileSync(db, JSON.stringify(data));
}
const removeblacklist = (id) => {
    data.blacklist = data.blacklist.filter(e => e !== id);
    fs.writeFileSync(db, JSON.stringify(data));
}
const addwhitelist = (id) => {
    data.whitelist.push(id);
    fs.writeFileSync(db, JSON.stringify(data));
}
const removewhitelist = (id) => {
    data.whitelist = data.blacklist.filter(e => e !== id);
    fs.writeFileSync(db, JSON.stringify(data));
}

module.exports = {
    changePersonal: changePersonal,
    changeGroupOnly: changeGroupOnly,
    updateCount: updateCount,
    forceFileUpdate: forceFileUpdate,
    refreshData: refreshData,
    changeWhitelist: changeWhitelist,
    addblacklist: addblacklist,
    removeblacklist: removeblacklist,
    addwhitelist: addwhitelist,
    removewhitelist: removewhitelist,
    data: data
}
