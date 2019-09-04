const infoService =require("../service/infoService");
const response =require("../utility/response");
module.exports = {
    getRouteExample:async(text)=>{
        try {
            let data =  await infoService.getRouteExample(text);
            return response.responseSuccess(200, data);
        } catch (error) {
            console.log(error);
            return response.responseError(400);
        }
    },

    
};
