module.exports = {
    response:async (ctx, resData) => {
        if (resData && resData.status_code && resData.status_code > 204) {           
            ctx.response.status = resData.status_code;               
            ctx.response.body = resData.info;       
        } 
        else{
            ctx.response.status = resData.status_code;            
            ctx.response.body = resData.info;
        }
            
    },
    /**
     *
     *
     * @param {Number} errCode
     * @param {Object} data
     * @returns {Object} errMsg 
     *  - {Number} errCode
     *  - {Object} info
     * 
     */
    responseError: (errCode,data) =>{
        /* Error message template */
        let errMsg = {};
        if(data== undefined){
            errMsg.status_code = errCode;
            errMsg.info="";
        }else{
            errMsg.status_code = errCode;
            errMsg.info=data;
        }
        
        return errMsg;
    },
    /**
     *
     *
     * @param {*} sucode
     * @param {*} data
     * @returns
     */
    responseSuccess: (sucode,data)=> {
        /* Error message template */
        let suMsg = {   
            status_code: sucode,
            info:data
        };
        return suMsg;
        
    }
};
