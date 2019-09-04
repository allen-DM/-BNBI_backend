const Router = require("koa-router");
const infoController =require("../controller/infoController");
const response =require("../utility/response");

const router = Router();
router.get("/route/sample/:text",async(ctx)=>{
    let text = ctx.params.text;
    let data = await infoController.getRouteExample(text);
    response.response(ctx, data);
});

module.exports = router;