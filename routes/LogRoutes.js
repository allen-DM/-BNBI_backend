const Router = require("koa-router");
const response = require("../utility/response");
const logController = require("../controller/LogController");
const actionLogConfig = require("../config/ActionLogConfig");
const log4js = require("../utility/log4js");
const router = Router();

router.get("/loginLog/:log", async (ctx) => {
    let loglog = await log4js.createlog4Js(actionLogConfig.getLogInLog);
    loglog.info("log: " + ctx.params.log);
    let log = ctx.params.log;
    let result = await logController.loginLog(log);
    response.response(ctx, result);
});

module.exports = router;