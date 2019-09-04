const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require("chai").expect;
const server = require("../index");


chai.use(chaiHttp);


describe("info.js", () => {
    
    describe("/GET getRouteExample", () => {
        it("it should get route sample information by test", (done) => {
            chai.request(endpointUrl)
                .get("/Info/route/sample/test")
                .end((err, res) => {
                    expect(err).to.not.exist;
                    expect(res.status).to.equal(200);                   
                    done();
                });
        });

        
    });

   
  
});

