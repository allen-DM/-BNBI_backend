const db = require("../utility/mysqlDB");
const actionLog = require("../utility/actionLog");
const actionLogConfig = require("../config/ActionLogConfig");
const errorStatus = require("../config/ErrorStatus.js");
const log4js = require("../utility/log4js");
module.exports = {
    /**
     * 根據關鍵字取得判決書列表
     * 
     * @param {String} keyword
     * @returns {List<Object>} result
     */
     getVerdictList: async (keyword) => {
        let log = await log4js.createlog4Js(actionLogConfig.getVerdictList);
        try {
            let keyword2 = '%' + keyword + '%';
            let result = await db.query("SELECT a.* FROM (SELECT a.judgmentid,a.class,a.datetime,a.mainjudge,a.secondaryjudge,a.clerk,a.conclusion,b.jtitle FROM legal.legalinfo AS a LEFT JOIN legal.rawdata AS b ON a.judgmentid=b.judgmentid) AS a WHERE a.judgmentid IN (SELECT judgmentid FROM legal.rawdata WHERE jfull like ?);", [keyword2]);       
            console.log(result)

            log.info("getReportTemplateList success: ", JSON.stringify(result));
            await actionLog.actionLog(actionLogConfig.getReportTamplate, {keyword }, result, errorStatus.GANNERAL_SUCCESS);
            log.info(JSON.stringify(result));
            return result;
        } catch (error) {
            if (null == error.errorCode || undefined == error.errorCode) {
                error.errorCode = errorStatus.GANNERAL_ERROR;
                error.message = error.stack;
            }
            await actionLog.actionLog(actionLogConfig.getReportTamplate, { keyword }, error.message, error.errorCode);
            log.error(error);
            throw error;
        }
    }
}
//     /**
//      * 依使用者id、科別及狀態取得報告模板清單
//      * 
//      * @param {String} userId
//      * @param {String} division
//      * @param {String} status
//      * @returns {List<Object>} result
//      */
//     getCompleteReportTemplateList: async (userId, division) => {
//         let log = await log4js.createlog4Js(actionLogConfig.getCompleteReport);
//         try {
//             let result = await db.query("SELECT * FROM fhirmcode.reporttemplate WHERE division = ? AND (user_id = ? OR user_id = '0') AND status = 's';", [division, userId]);
//             for (i = 0; i < result.length; i++) {
//                 result[i].template_name = await replacePublicTemplateName(result[i].user_id, result[i].template_name,log);
//             }
//             log.info("getPhraseTemplateList success: ", JSON.stringify(result));
//             await actionLog.actionLog(actionLogConfig.getCompleteReport, { userId, division }, result, errorStatus.GANNERAL_SUCCESS);
//             log.info(JSON.stringify(result));
//             return result;
//         } catch (error) {
//             if (null == error.errorCode || undefined == error.errorCode) {
//                 error.errorCode = errorStatus.GANNERAL_ERROR;
//                 error.message = error.stack;
//             }
//             await actionLog.actionLog(actionLogConfig.getCompleteReport, { userId, division }, error.message, error.errorCode);
//             log.error(error);
//             throw error;
//         }
//     },
//     /**
//      * 依使用者id及科別取得片語模板清單
//      * 
//      * @param {String} userId
//      * @param {String} division
//      * @returns {List<Object>} result
//      */
//     getPhraseTemplateList: async (userId, division) => {
//         let log = await log4js.createlog4Js(actionLogConfig.getPhraseTamplate);
//         try {
//             let getPhraseTemplateListSQL = "SELECT * FROM fhirmcode.phrasetemplate WHERE division = '" + division + "' AND (user_id = '" + userId + "' OR user_id = '" + 0 + "');";
//             log.info("getPhraseTemplateListSQL: " + getPhraseTemplateListSQL);
//             let result = await db.query(getPhraseTemplateListSQL);
//             for (i = 0; i < result.length; i++) {
//                 result[i].template_name = await replacePublicTemplateName(result[i].user_id, result[i].template_name,log);
//                 result[i].template = JSON.parse(result[i].template);
//             }
//             log.info("getPhraseTemplateList success: ", JSON.stringify(result));
//             await actionLog.actionLog(actionLogConfig.getPhraseTamplate, { userId, division }, result, errorStatus.GANNERAL_SUCCESS);
//             log.info(JSON.stringify(result));
//             return result;
//         } catch (error) {
//             if (null == error.errorCode || undefined == error.errorCode) {
//                 error.errorCode = errorStatus.GANNERAL_ERROR;
//                 error.message = error.stack;
//             }
//             await actionLog.actionLog(actionLogConfig.getPhraseTamplate, { userId, division }, error.message, error.errorCode);
//             log.error(error);
//             throw error;
//         }
//     },
//     /**
//      * 依使用者id、科別及狀態取得片語模板清單
//      * 
//      * @param {String} userId
//      * @param {String} division
//      * @param {String} status
//      * @returns {List<Object>} result
//      */
//     getCompletePhraseTemplateList: async (userId, division) => {
//         let log = await log4js.createlog4Js(actionLogConfig.getCompletePhraseTamplate);
//         try {
//             let getPhraseTemplateListSQL = "SELECT * FROM fhirmcode.phrasetemplate WHERE division = '" + division + "' AND (user_id = '" + userId + "' OR user_id = '" + 0 + "') AND status = 's';";
//             log.info("getPhraseTemplateListSQL: " + getPhraseTemplateListSQL);
//             let result = await db.query(getPhraseTemplateListSQL);
//             for (i = 0; i < result.length; i++) {
//                 result[i].template_name = await replacePublicTemplateName(result[i].user_id, result[i].template_name,log);
//                 result[i].template = JSON.parse(result[i].template);
//             }
//             log.info("getPhraseTemplateList success: ", JSON.stringify(result));
//             await actionLog.actionLog(actionLogConfig.getCompletePhraseTamplate, { userId, division }, result, errorStatus.GANNERAL_SUCCESS);
//             log.info(JSON.stringify(result));
//             return result;
//         } catch (error) {
//             if (null == error.errorCode || undefined == error.errorCode) {
//                 error.errorCode = errorStatus.GANNERAL_ERROR;
//                 error.message = error.stack;
//             }
//             await actionLog.actionLog(actionLogConfig.getCompletePhraseTamplate, { userId, division }, error.message, error.errorCode);
//             log.error(error);
//             throw error;
//         }
//     },
//     /**
//      * 依使用者id、科別、模板名稱取得報告模板
//      * 
//      * @param {String} userId
//      * @param {String} division
//      * @param {String} templateName
//      * @returns {Object} result
//      */
//     getReportTemplate: async (userId, division, templateName) => {
//         let log = await log4js.createlog4Js(actionLogConfig.getReportTamplate);
//         try {
//             return getReportTemplate(userId, division, templateName, log);
//         } catch (error) {
//             if (null == error.errorCode || undefined == error.errorCode) {
//                 error.errorCode = errorStatus.GANNERAL_ERROR;
//                 error.message = error.stack;
//             }
//             await actionLog.actionLog(actionLogConfig.getReportTamplate, { userId, division, templateName }, error.message, error.errorCode);
//             log.error(error);
//             throw error;
//         }
//     },
//     /**
//      * 依使用者id、科別、模板名稱取得片語模板
//      * 
//      * @param {String} userId
//      * @param {String} division
//      * @param {String} templateName
//      * @returns {Object} result
//      */
//     getPhraseTemplate: async (userId, division, templateName) => {
//         let log = await log4js.createlog4Js(actionLogConfig.getPhraseTamplate);
//         try {
//             let result = await getPhraseTemplate(userId, division, templateName);
//             await actionLog.actionLog(actionLogConfig.getPhraseTamplate, { userId, division, templateName }, result, errorStatus.GANNERAL_SUCCESS);
//             log.info(JSON.stringify(result));
//             return result;
//         } catch (error) {
//             if (null == error.errorCode || undefined == error.errorCode) {
//                 error.errorCode = errorStatus.GANNERAL_ERROR;
//                 error.message = error.stack;
//             }
//             await actionLog.actionLog(actionLogConfig.getPhraseTamplate, { userId, division, templateName }, error.message, error.errorCode);
//             log.error(error);
//             throw error;
//         }
//     },
//     /**
//      * 依使用者id、科別、模板名稱刪除片語模板
//      * (無法刪除公版(userId = 0))
//      * 
//      * @param {String} userId
//      * @param {String} division
//      * @param {String} templateName
//      * @returns {String} isSuccess
//      */
//     deletePhraseTemplate: async (userId, templateName, division) => {
//         let log = await log4js.createlog4Js(actionLogConfig.deletePhraseTamplate);
//         try {
//             let report = await deletePhraseTemplate(userId, templateName, division);
//             await actionLog.actionLog(actionLogConfig.deletePhraseTamplate, { userId, templateName, division }, report, errorStatus.GANNERAL_SUCCESS);
//             log.info(JSON.stringify(report));
//             return report;
//         } catch (error) {
//             if (null == error.errorCode || undefined == error.errorCode) {
//                 error.errorCode = errorStatus.GANNERAL_ERROR;
//                 error.message = error.stack;
//             }
//             await actionLog.actionLog(actionLogConfig.deletePhraseTamplate, { userId, templateName, division }, error.message, error.errorCode);
//             log.error(error);
//             throw error;
//         }
//     },
//     /**
//      * 依使用者id、科別、模板名稱刪除報告模板
//      * (無法刪除公版(userId = 0))
//      * 
//      * @param {String} userId
//      * @param {String} division
//      * @param {String} templateName
//      * @returns {String} isSuccess
//      */
//     deleteReportTemplate: async (userId, templateName, division) => {
//         let log = await log4js.createlog4Js(actionLogConfig.deleteReportTamplate);
//         try {
//             let report = await deleteReportTemplate(userId, templateName, division);
//             return report;
//         } catch (error) {
//             if (null == error.errorCode || undefined == error.errorCode) {
//                 error.errorCode = errorStatus.GANNERAL_ERROR;
//                 error.message = error.stack;
//             }
//             await actionLog.actionLog(actionLogConfig.deleteReportTamplate, { userId, templateName, division }, error.message, error.errorCode);
//             log.error(error);
//             throw error;
//         }
//     },
//     /**
//      * C-1-1新增放射科報告
//      *
//      * @param {Object} request
//      * @returns {String} isSuccess
//      */
//     createRdReport: async (request) => {
//         const transcationCon = await db.getConnect();
//         let log = await log4js.createlog4Js(actionLogConfig.creactRdReport);
//         try {
//             transcationCon.beginTransaction();
//             let orreqno = request.orreqno;
//             await vaildRdReportStatus(orreqno,log);
//             let hhisnum = request.hhisnum;
//             if (null == hhisnum) {
//                 let error = {};
//                 error.errorCode = errorStatus.DATA_NOT_EXIST;
//                 error.message = "hhisnum cannot null.";
//                 throw error;
//             }
//             let status = request.status;
//             if (null == status) {
//                 let error = {};
//                 error.errorCode = errorStatus.DATA_NOT_EXIST;
//                 error.message = "status cannot null.";
//                 throw error;
//             }
//             let templateId = request.templateId;
//             if ("number" != typeof (templateId) || 0 == templateId) {
//                 let error = {};
//                 error.errorCode = errorStatus.PAY_LOAD_ERROR;
//                 error.message = "templatId error.";
//                 throw error;
//             }
//             let version = await getRDReportVersion(orreqno) + 1;
//             let template = request.template;
//             if (null == template || 0 == template.length) {
//                 let error = {};
//                 error.errorCode = errorStatus.DATA_NOT_EXIST;
//                 error.message = "template cannot null.";
//                 throw error;
//             }
//             let createRdReportSQL = "INSERT INTO fhirmcode.rdreport (REQ_NO1, HHISNUM, RSVERNO, OP_CODE1, template_id)" +
//                 "  VALUES(?, ?, ?,'', ?);";
//             let createRdReportParams = [orreqno, hhisnum, version, templateId];
//             await db.transcationQuery(transcationCon, createRdReportSQL, createRdReportParams);
//             try {
//                 let insertTemplateObject = await utilsService.insertTemplateSQL(templateId, orreqno, version, template, log);
//                 await db.transcationQuery(transcationCon, insertTemplateObject.sql, insertTemplateObject.params);
//             } catch (error) {
//                 log.error(error);
//                 error.errorCode = errorStatus.DATABASE_ERROR;
//                 error.message = error.stack;
//                 throw error;
//             }
//             await db.transcationQuery(transcationCon, "UPDATE fhirmcode.rdorder SET ORSTATUS = ? WHERE ORREQNO = ?;", [status, orreqno]);
//             await mysqlquery.transcationCommit(transcationCon);
//             let response = "Success.";
//             await actionLog.actionLog(actionLogConfig.creactRdReport, request, response, errorStatus.GANNERAL_SUCCESS);
//             log.info(JSON.stringify(response));
//             return response;
//         } catch (error) {
//             await transcationCon.rollback();
//             if (null == error.errorCode || undefined == error.errorCode) {
//                 error.errorCode = errorStatus.GANNERAL_ERROR;
//                 error.message = error.stack;
//             }
//             await actionLog.actionLog(actionLogConfig.creactRdReport, request, error.message, error.errorCode);
//             log.error(error);
//             throw error;
//         } finally {
//             transcationCon.release();
//         }
//     },
//     /**
//      * 為C-1-1-1、C-2-1-1下載json檔
//      *
//      * @param {String} orreqno
//      * @returns {Object} report
//      */
//     getJsonDownloadInfo: async (orreqno, division) => {
//         let log = await log4js.createlog4Js(actionLogConfig.getJson);
//         try {
//             let result = {};
//             if ("PATH" == division) {
//                 result = await utilsService.getPathReportInfoByORREQNO(orreqno, log);
//                 result = await replaseTopicCodeBook(result, log);
//                 result = await replaseClozeCodeBook(result, log);
//             }
//             else if ("RD" == division) {
//                 result = await utilsService.getRdReport(orreqno, log);
//                 result = await replaseTopicCodeBook(result, log);
//                 result = await replaseClozeCodeBook(result, log);
//             }
//             else {
//                 let error = {};
//                 error.errorCode = errorStatus.PAY_LOAD_ERROR;
//                 error.message = "division error.";
//                 throw error;
//             }
//             await actionLog.actionLog(actionLogConfig.getJson, { orreqno, division }, result, errorStatus.GANNERAL_SUCCESS);
//             log.info(JSON.stringify(result));
//             return result;
//         } catch (error) {
//             if (null == error.errorCode || undefined == error.errorCode) {
//                 error.errorCode = errorStatus.GANNERAL_ERROR;
//                 error.message = error.stack;
//             }
//             await actionLog.actionLog(actionLogConfig.getJson, { orreqno, division }, error.message, error.errorCode);
//             log.error(error);
//             throw error;
//         }
//     },
//     /**
//      * 讀取 AI Json 檔
//      * 
//      * @param {String} orreqno
//      * @returns {Object} result
//      */
//     getAIJsonFile: async (orreqno) => {
//         let log = await log4js.createlog4Js(actionLogConfig.getJson);
//         try {
//             // let file1 = aiJson.path + orreqno + aiJson.pathFile1;
//             // console.log("file1: " + file1);
//             // let data1 = await utilsService.readFile(file1);
//             // let file2 = aiJson.path + orreqno + aiJson.pathFile2;
//             // console.log("file2: " + file2);
//             // let data2 = await utilsService.readFile(file2);
//             // let file3 = aiJson.path + orreqno + aiJson.pathFile3;
//             // console.log("file3: " + file3);
//             // let data3 = await utilsService.readFile(file3);
//             let file4 = aiJson.path + orreqno + aiJson.pathFile4;
//             log.info("file4: " + file4);
//             let data4 = JSON.parse(await utilsService.readFile(file4, log));
//             let grade1 = data4.information.grade_1;
//             let grade2 = data4.information.grade_2;
//             let grade3 = data4.information.grade_3;
//             let grade4 = data4.information.grade_4;
//             let result = { "grade1": grade1, "grade2": grade2, "grade3": grade3, "grade4": grade4 };
//             log.info("result: " + JSON.stringify(result));
//             await actionLog.actionLog(actionLogConfig.getJson, orreqno, result, errorStatus.GANNERAL_SUCCESS);
//             log.info(JSON.stringify(result));
//             return result;
//         } catch (error) {
//             if (null == error.errorCode || undefined == error.errorCode) {
//                 error.errorCode = errorStatus.GANNERAL_ERROR;
//                 error.message = error.stack;
//             }
//             await actionLog.actionLog(actionLogConfig.getJson, orreqno, error.message, error.errorCode);
//             log.error(error);
//             throw error;
//         }
//     },
//     /**
//      *寫入Json檔
//      * 
//      * @param {Object} body
//      * @returns {string} "json data is saved."
//      */
//     writeJsonFile: async (body) => {
//         let log = await log4js.createlog4Js(actionLogConfig.creactJson);
//         try {
//             await utilsService.writeFile(body, log);
//             let response = "json data is saved.";
//             await actionLog.actionLog(actionLogConfig.creactJson, body, response, errorStatus.GANNERAL_SUCCESS);
//             log.info(JSON.stringify(response));
//             return response;
//         } catch (error) {
//             if (null == error.errorCode || undefined == error.errorCode) {
//                 error.errorCode = errorStatus.GANNERAL_ERROR;
//                 error.message = error.stack;
//             }
//             await actionLog.actionLog(actionLogConfig.creactJson, body, error.message, error.errorCode);
//             log.error(error);
//             throw error;
//         }
//     },
//     /**
//      * 依關鍵字取得編碼部資料
//      * 
//      * @param {String} keyword
//      * @returns {Object} result
//      */
//     getCodeBooksByKeyword: async (keyword) => {
//         let log = await log4js.createlog4Js(actionLogConfig.getCodeBooks);
//         try {
//             let getCodeBooksByKeywordSQL = "SELECT * FROM fhirmcode.codebook";
//             if (null != keyword) {
//                 getCodeBooksByKeywordSQL = getCodeBooksByKeywordSQL + " WHERE value LIKE '%" + keyword + "%'";
//             }
//             getCodeBooksByKeywordSQL = getCodeBooksByKeywordSQL + ";";
//             log.info("getCodeBooksByKeywordSQL: " + getCodeBooksByKeywordSQL);
//             let result = await db.query(getCodeBooksByKeywordSQL);
//             await actionLog.actionLog(actionLogConfig.getCodeBooks, keyword, result, errorStatus.GANNERAL_SUCCESS);
//             log.info(JSON.stringify(result));
//             return result;
//         } catch (error) {
//             if (null == error.errorCode || undefined == error.errorCode) {
//                 error.errorCode = errorStatus.GANNERAL_ERROR;
//                 error.message = error.stack;
//             }
//             await actionLog.actionLog(actionLogConfig.getCodeBooks, keyword, error.message, error.errorCode);
//             log.error(error);
//             throw error;
//         }
//     }
// };

// /**
//  * 將未輸入且為數值型參數給0
//  * 
//  * @param {String} object 
//  * @returns {int} object
//  */
// let replaceUndefindTo0 = async function (object) {
//     if (null == object || undefined == object) {
//         object = 0;
//     }
//     return object;
// }

// /**
//  * 依申請序號取得目前最新病理報告版本
//  * 
//  * @param {String} orreqno 
//  * @returns {int} version
//  */
// let getPathReportVersion = async function (orreqno) {
//     let log = await log4js.createlog4Js(actionLogConfig.getPathReport);
//     try {
//         let getReportVersionSQL = "SELECT RSVERNO FROM fhirmcode.rpresult WHERE RSREQNO = '" + orreqno + "' ORDER BY RSVERNO DESC LIMIT 1;";
//         log.info("getReportVersionSQL: " + getReportVersionSQL);
//         let result = await db.query(getReportVersionSQL);
//         log.info("result: " + JSON.stringify(result));
//         let version = 0;
//         if (0 != result.length) {
//             version = result[0].RSVERNO;
//         }
//         log.info("version: " + version);
//         return version;
//     } catch (error) {
//         if (null == error.errorCode || undefined == error.errorCode) {
//             error.errorCode = errorStatus.GANNERAL_ERROR;
//             error.message = error.stack;
//         }
//         await actionLog.actionLog(actionLogConfig.getPathReport, orreqno, error.message, error.errorCode);
//         log.error(error);
//         throw error;
//     }
// }

// /**
//  * 依申請序號取得目前最新放射報告版本
//  * 
//  * @param {String} orreqno 
//  * @returns {int} version
//  */
// let getRDReportVersion = async function (orreqno) {
//     let log = await log4js.createlog4Js(actionLogConfig.getRdReport);
//     try {
//         let getReportVersionSQL = "SELECT RSVERNO FROM fhirmcode.rdreport WHERE REQ_NO1 = '" + orreqno + "' ORDER BY RSVERNO DESC LIMIT 1;";
//         log.info("getReportVersionSQL: " + getReportVersionSQL);
//         let result = await db.query(getReportVersionSQL);
//         log.info("result: " + JSON.stringify(result));
//         let version = 0;
//         if (0 != result.length) {
//             version = result[0].RSVERNO;
//         }
//         log.info("version: " + version);
//         await actionLog.actionLog(actionLogConfig.getRdReport, orreqno, version, errorStatus.GANNERAL_ERROR);
//         log.info(JSON.stringify(version));
//         return version;
//     } catch (error) {
//         if (null == error.errorCode || undefined == error.errorCode) {
//             error.errorCode = errorStatus.GANNERAL_ERROR;
//             error.message = error.stack;
//         }
//         await actionLog.actionLog(actionLogConfig.getRdReport, orreqno, error.message, error.errorCode);
//         log.error(error);
//         throw error;
//     }
// }

// /**
//  * 依使用者id、科別、模板名稱取得報告模板
//  * 
//  * @param {String} userId 
//  * @param {String} division 
//  * @param {String} templateName 
//  * @returns {Object} result
//  */
// let getReportTemplate = async function (userId, division, templateName, log) {
//     try {
//         let template = await db.query("SELECT * FROM fhirmcode.reporttemplate WHERE division = ? AND user_id = ? AND template_name = ?;", [division, userId, templateName]);
//         log.info("template result: " + JSON.stringify(template));
//         if (0 == template.length) {
//             let error = {};
//             error.errorCode = errorStatus.DATA_NOT_EXIST;
//             error.message = "template does not exist.";
//             throw error;
//         }
//         let cloze = await utilsService.getTemplateInfoByTemplateId(template[0].id, userId, log);
//         let result = { template, ...cloze };
//         log.info("result: " + JSON.stringify(result));
//         await actionLog.actionLog(actionLogConfig.getReportTamplate, { userId, division, templateName }, result, errorStatus.GANNERAL_SUCCESS);
//         log.info(JSON.stringify(result));
//         return result;
//     } catch (error) {
//         if (null == error.errorCode || undefined == error.errorCode) {
//             error.errorCode = errorStatus.GANNERAL_ERROR;
//             error.message = error.stack;
//         }
//         await actionLog.actionLog(actionLogConfig.getReportTamplate, orreqno, error.message, error.errorCode);
//         log.error(error);
//         throw error;
//     }
// }

// /**
//  * 依使用者id、科別、模板名稱取得片語模板
//  * 
//  * @param {String} userId 
//  * @param {String} division 
//  * @param {String} templateName 
//  * @returns {Object} result
//  */
// let getPhraseTemplate = async function (userId, division, templateName) {
//     let log = await log4js.createlog4Js(actionLogConfig.getPhraseTamplate);
//     try {
//         let getPhraseTemplateSQL = "SELECT * FROM fhirmcode.phrasetemplate WHERE division = '" + division + "' AND user_id = '" + userId + "' AND template_name = '" + templateName + "';";
//         log.info("getPhraseTemplatSQL: " + getPhraseTemplateSQL);
//         let result = await db.query(getPhraseTemplateSQL);
//         if (null == result || 0 == result.length) {
//             await actionLog.actionLog(actionLogConfig.getPhraseTamplate, { userId, division, templateName }, {}, errorStatus.GANNERAL_SUCCESS);
//             log.info({});
//             return {};
//         }
//         result[0].template = JSON.parse(result[0].template);
//         log.info("result: " + JSON.stringify(result));
//         await actionLog.actionLog(actionLogConfig.getPhraseTamplate, { userId, division, templateName }, result, errorStatus.GANNERAL_SUCCESS);
//         log.info(JSON.stringify(result));
//         return result;
//     } catch (error) {
//         if (null == error.errorCode || undefined == error.errorCode) {
//             error.errorCode = errorStatus.GANNERAL_ERROR;
//             error.message = error.stack;
//         }
//         await actionLog.actionLog(actionLogConfig.getPhraseTamplate, orreqno, error.message, error.errorCode);
//         log.error(error);
//         throw error;
//     }
// }

// /**
//  * 依使用者id、科別、模板名稱刪除片語模板
//  * 
//  * @param {String} userId 
//  * @param {String} templateName 
//  * @param {String} division 
//  * @returns {String} isSuccess
//  */
// let deletePhraseTemplate = async function (userId, templateName, division) {
//     let log = await log4js.createlog4Js(actionLogConfig.deletePhraseTamplate);
//     try {
//         let deletePhraseTemplateSQL = "DELETE FROM fhirmcode.phrasetemplate WHERE user_id = '" + userId + "' AND template_name = '" + templateName + "' AND division = '" + division + "';";
//         log.info("deletePhraseTemplateSQL: " + deletePhraseTemplateSQL);
//         await db.query(deletePhraseTemplateSQL);
//         return "success";
//     } catch (error) {
//         if (null == error.errorCode || undefined == error.errorCode) {
//             error.errorCode = errorStatus.GANNERAL_ERROR;
//             error.message = error.stack;
//         }
//         await actionLog.actionLog(actionLogConfig.deletePhraseTamplate, orreqno, error.message, error.errorCode);
//         log.error(error);
//         throw error;
//     }
// }

// /**
//  * 依使用者id、科別、模板名稱刪除報告模板
//  * 
//  * @param {String} userId 
//  * @param {String} templateName 
//  * @param {String} division 
//  * @returns {String} isSuccess
//  */
// let deleteReportTemplate = async function (userId, templateName, division) {
//     let log = await log4js.createlog4Js(actionLogConfig.deleteReportTamplate);
//     try {
//         await db.query("DELETE FROM fhirmcode.reporttemplate WHERE user_id = ? and template_name = ? and division = ?;", [userId, templateName, division]);
//         let response = "success";
//         await actionLog.actionLog(actionLogConfig.deleteReportTamplate, { userId, templateName, division }, response, errorStatus.GANNERAL_SUCCESS);
//         log.info(JSON.stringify(response));
//         return response;
//     } catch (error) {
//         if (null == error.errorCode || undefined == error.errorCode) {
//             error.errorCode = errorStatus.GANNERAL_ERROR;
//             error.message = error.stack;
//         }
//         await actionLog.actionLog(actionLogConfig.deleteReportTamplate, orreqno, error.message, error.errorCode);
//         log.error(error);
//         throw error;
//     }
// }

// /**
//  * 公版名稱回傳格式
//  * 
//  * @param {String} userId 
//  * @param {String} name 
//  * @returns {String} name
//  */
// let replacePublicTemplateName = async function (userId, name,log) {
//     try {
//         if ("0" == userId) {
//             name = name + "(公)";
//         }
//         return name;
//     } catch (error) {
//         if (null == error.errorCode || undefined == error.errorCode) {
//             error.errorCode = errorStatus.GANNERAL_ERROR;
//             error.message = error.stack;
//         }
//         log.error(error);
//         throw error;
//     }
// }

// /**
//  * 依科別查詢醫生清單
//  * 
//  * @param {String} division 
//  * @returns {List<Object>} result
//  */
// let getC2DoctorListByDivision = async function (division, log) {
//     try {
//         var getC2DoctorListSQL = "SELECT * FROM fhirmcode.doctor where division = '" + division + "';";
//         log.info("getC2DoctorListSQL: " + getC2DoctorListSQL);
//         return await db.query(getC2DoctorListSQL);
//     } catch (error) {
//         if (null == error.errorCode || undefined == error.errorCode) {
//             error.errorCode = errorStatus.GANNERAL_ERROR;
//             error.message = error.stack;
//         }
//         log.error(error);
//         throw error;
//     }
// }

// /**
//  * 檢查放射科報告是否存在
//  * 
//  * @param {String} division 
//  * @returns {List<Object>} result
//  */
// let vaildRdReportStatus = async function (orreqno,log) {
//     try {
//         let vaildOrreqnoSQL = "SELECT ORREQNO, ORSTATUS, HHISNUM FROM fhirmcode.rdorder WHERE ORREQNO = '" + orreqno + "' ;";
//         let result = await db.query(vaildOrreqnoSQL);
//         if (null == result || 0 == result.length) {
//             throw "ORREQNO is not exist."
//         }
//         return result;
//     } catch (error) {
//         if (null == error.errorCode || undefined == error.errorCode) {
//             error.errorCode = errorStatus.GANNERAL_ERROR;
//             error.message = error.stack;
//         }
//         await actionLog.actionLog(actionLogConfig.creactRdReport, orreqno, error.message, error.errorCode);
//         log.error(error);
//         throw error;
//     }
// }

// /**
//  * 將 topic 回答轉為編碼簿code
//  * 
//  * @param {Object} object 
//  * @returns {Object} result
//  */
// let replaseTopicCodeBook = async function (object, log) {
//     try {
//         let topicList = object.topic;
//         if (null == topicList || 0 == topicList.length) {
//             return object;
//         }
//         for (i = 0; i < topicList.length; i++) {
//             let SQLQuery = "SELECT code FROM fhirmcode.codebook WHERE value = '" + topicList[i].value + "';";
//             log.info("SQL " + i + ": " + SQLQuery);
//             let code = await db.query(SQLQuery);
//             log.info(i + " code: " + JSON.stringify(code));
//             if (null != code && undefined != code && 0 != code.length) {
//                 topicList[i].code = code[0].code;
//             }
//         }
//         object.topic = topicList;
//         log.info("object: " + JSON.stringify(object));
//         return object;
//     } catch (error) {
//         if (null == error.errorCode || undefined == error.errorCode) {
//             error.errorCode = errorStatus.GANNERAL_ERROR;
//             error.message = error.stack;
//         }
//         log.error(error);
//         throw error;
//     }
// }

// /**
//  * 將 cloze 回答轉為編碼簿code
//  * 
//  * @param {Object} object 
//  * @returns {Object} result
//  */
// let replaseClozeCodeBook = async function (object, log) {
//     try {
//         let clozeList = object.cloze;
//         if (null == clozeList || 0 == clozeList.length) {
//             return object;
//         }
//         for (i = 0; i < clozeList.length; i++) {
//             let values = clozeList[i].values_json;
//             log.info("cloze parse json values: " + values);
//             for (j = 0; j < values.length; j++) {
//                 let SQLQuery = "SELECT code FROM fhirmcode.codebook WHERE value = '" + values[j].value + "';";
//                 log.info("SQL " + j + ": " + SQLQuery);
//                 let code = await db.query(SQLQuery);
//                 log.info(j + " code: " + JSON.stringify(code));
//                 if (null != code && undefined != code && 0 != code.length) {
//                     clozeList[i].values_json[j].code = code[0].code;
//                 }
//             }
//         }
//         object.cloze = clozeList;
//         log.info("object: " + JSON.stringify(object));
//         return object;
//     } catch (error) {
//         if (null == error.errorCode || undefined == error.errorCode) {
//             error.errorCode = errorStatus.GANNERAL_ERROR;
//             error.message = error.stack;
//         }
//         log.error(error);
//         throw error;
//     }
