const db = require("./mysqlDB");
const log4js = require("../utility/log4js");
const errorStatus = require("../config/ErrorStatus.js");
module.exports = {
    actionLog: async (actionType, body, data, status) => {
        let request = JSON.stringify(body);
        let responses = JSON.stringify(data);
        let log = await log4js.createlog4Js(actionType);
        try {
            let insertActionSql = "INSERT INTO actionlog SET action_type = ?, request = ?, response = ?, status = ?, time = now();";
            let insertActionParams = [actionType, request, responses, status];
            let result = await db.query(insertActionSql, insertActionParams);
            log.info("actionLog save:" + JSON.stringify(result));
        } catch (error) {
            if (null == error.errorCode || undefined == error.errorCode) {
                error.errorCode = errorStatus.GANNERAL_ERROR;
                error.message = error.stack;
            }
            log.error(error);
            return error;
        }
    }
};