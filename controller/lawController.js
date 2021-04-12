const lawService = require("../service/lawService");
const response = require("../utility/response");
const errorStatus = require("../config/ErrorStatus.js");
const actionLog = require("../utility/actionLog");
const actionLogConfig = require("../config/ActionLogConfig");
const log4js = require("../utility/log4js");
module.exports = {
    getVerdictList: async (request) => {
        let log = await log4js.createlog4Js(actionLogConfig.getVerdictList);
        try {
            let keyword = request;
            let result = await lawService.getVerdictList(keyword);
            return response.responseSuccess(errorStatus.GANNERAL_SUCCESS, result);
        } catch (error) {
            if (null == error.errorCode || undefined == error.errorCode) {
                error.errorCode = errorStatus.GANNERAL_ERROR;
                error.message = error.stack;
            }
            await actionLog.actionLog(actionLogConfig.getVerdictList, keyword, error.message, error.errorCode);
            log.error("Error: " + JSON.stringify(error));
            return response.responseError(error.errorCode, error.message);
        }
    }
};