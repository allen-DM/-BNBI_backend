const log4js = require("log4js");
module.exports = {
    createlog4Js: async function (name) {
        log4js.configure({
            appenders: {
                console: { type: 'console' },
                datefile: {
                    type: 'dateFile',
                    filename: './log/' + name,
                    pattern: 'yyyy-MM-dd.log',
                    alwaysIncludePattern: true
                }
            },
            categories: { default: { appenders: ["console", "datefile"], level: "all" } }
        });
        let logger = log4js.getLogger(name);
        console.log("name :" + JSON.stringify(name));
        return logger;
    }
};
// //-hh:mm:ss