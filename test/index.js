const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require("chai").expect;
const server = require("../index");
const config = require("../config/default.json");


chai.use(chaiHttp);
before(async() => {
    //未來應該是透過呼叫api認證取得token值
    //authToken=await UnitTestTool.unitGetoken();
    endpointUrl = `http://localhost:${config.port}${config.env}/${config.version}`;
});

