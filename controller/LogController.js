// const logService = require("../service/LogService");
const response = require("../utility/response");
const errorStatus = require("../config/ErrorStatus");
const actionLog = require("../utility/actionLog");
const actionLogConfig = require("../config/ActionLogConfig");
const log4js = require("../utility/log4js");
module.exports = {
    loginLog: async (log) => {
        let loglog = await log4js.createlog4Js(actionLogConfig.getLogInLog);
        try {
            await actionLog.actionLog(actionLogConfig.getLogInLog, log, {}, errorStatus.GANNERAL_SUCCESS);
            loglog.info({});
            return response.responseSuccess(errorStatus.GANNERAL_SUCCESS, {});
        } catch (error) {
            if (null == error.errorCode || undefined == error.errorCode) {
                error.errorCode = errorStatus.GANNERAL_ERROR;
                error.message = error.stack;
            }
            await actionLog.actionLog(actionLogConfig.getCompleteReport, { userId, division }, error.message, error.errorCode);
            loglog.error(error);
            return response.responseError(error.errorCode, error.message);
        }
    }
};