const Router = require("koa-router");
const lawController = require("../controller/lawController");
const response = require("../utility/response");
const actionLogConfig = require("../config/ActionLogConfig");
const log4js = require("../utility/log4js");
const router = Router();

router.get("/law/getVerdictList/:keyword", async (ctx) => {
	let log = await log4js.createlog4Js(actionLogConfig.getVerdictList);
	log.info("keyword: " + ctx.params.keyword);
	let keyword = ctx.params.keyword;
	let data = await lawController.getVerdictList(keyword);
	response.response(ctx, data);
});

// router.get("/c4/getReportTemplateList/:userId&:division", async (ctx) => {
// 	let log = await log4js.createlog4Js(actionLogConfig.getReportTamplate);
// 	log.info("userId: " + ctx.params.userId);
// 	let userId = ctx.params.userId;
// 	log.info("division: " + ctx.params.division);
// 	let division = ctx.params.division;
// 	let data = await cController.getReportTemplateList(userId, division);
// 	response.response(ctx, data);
// });

// router.post('/c21/createPathReport', async function (ctx) {
// 	let log = await log4js.createlog4Js(actionLogConfig.creactPathReport);
// 	log.info("request: " + JSON.stringify(ctx.request.body));
// 	let request = ctx.request.body;
// 	let result = await cController.createPathReport(request);
// 	response.response(ctx, result);
// });

//寫入Json檔
// router.put("/writeJsonFile", async (ctx) => {
// 	let log = await log4js.createlog4Js(actionLogConfig.creactJson);
// 	log.info("request: " + JSON.stringify(ctx.request.body));
// 	let body = ctx.request.body;
// 	let data = await cController.writeJsonFile(body);
// 	response.response(ctx, data);
// });


module.exports = router;