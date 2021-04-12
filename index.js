const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const logger = require("koa-logger");
const router = require("./router");
const cors = require("koa2-cors");
// const serve = require("koa-static");
// const path = require("path");
const config =require("./config/default.json");
const app = new Koa();
app.use(bodyParser());
// app.use(serve(path.join(__dirname,"public")));
app.use(logger());
app.use(cors({
    origin:  () =>{
        return "*";
    },
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization","Authorization"],
    credentials: true,
    allowMethods: ["PUT","GET", "POST", "DELETE","OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"],
}));

app.use(router.routes());

app.listen(config.port);
console.log("work");