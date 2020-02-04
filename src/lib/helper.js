const fs = require('fs');

module.exports.readConfig = () => {
    let config = {};
    fs.readdirSync('./config').forEach((file) => {
        config[file.split('.')[0]] = JSON.parse(fs.readFileSync(`./config/${file}`).toString())
    });
    return config;
};
