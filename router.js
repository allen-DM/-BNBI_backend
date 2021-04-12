const Router = require("koa-router");
const info = require("./routes/info");
const law = require("./routes/lawRoutes.js");

// const jwtKoa = require("koa-jwt");
const config =require("./config/default.json");
const router = Router();


// 執行這段程式碼時即作jwt驗證(是否存在、有效性、時效性) 確認修改
// router.use(jwtKoa({secret : config.jwt.secret}).unless({
//     path:config.jwt.jwtunless//符合路徑的api不做jwt驗證
// }));
router.use(`${config.env}/${config.version}/Info`, info.routes());
router.use(`${config.env}/${config.version}`, law.routes());

module.exports = router;
