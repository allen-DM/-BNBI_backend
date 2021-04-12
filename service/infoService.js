/* eslint-disable no-useless-catch */
// const mysqlquery = require("../utility/mysqlDB");
// const moment = require("moment");
const pdf = require("html-pdf");
const fs = require("fs");
const html = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>捷克</title>
        <style>
            @import url(https://fonts.googleapis.com/earlyaccess/cwtexkai.css);
            body{
                width: 100%;
                font-family: 'cwTeXKai', serif;
                font-size: 1.2rem;
            }
            .page_container{
                width: 90%;
                margin: auto;
            }
            h1{
                text-align: center;
                font-weight: bold;
            }
            h3{
                font-weight: bold;
            }
            table{
                width: 100%;
                border-collapse: collapse;
            }
            table, th, td{
                border: 1px solid black;
                padding: 0.3rem;
            }
            .form_head .title{
                text-align: center;
            }
            .form_body th{
                font-weight: bold;
            }
            .form_body .no{
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="page_container">
		<div class="title">
                <h1>無人載具科技創新實驗每月通報單</h1>
            </div>
            <div class="form_head">
			
                <h3>一、基本資料</h3>
                <table>
                    <tr>
                        <td class="title" width="15%">計畫名稱</td>
                        <td colspan="3"></td>
                    </tr>
                    <tr>
                        <td class="title" width="15%">申請人名稱</td>
                        <td colspan="3"></td>
                    </tr>
                    <tr>
                        <td class="title" width="15%">負責人姓名</td>
                        <td></td>
                        <td class="title" width="15%">通報人姓名</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="title" width="15%">通報人職稱</td>
                        <td></td>
                        <td class="title" width="15%">通報人電話</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="title" width="15%">通報人手機</td>
                        <td></td>
                        <td class="title" width="15%">通報人email</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="title" width="15%">通報人<br>核章</td>
                        <td></td>
                        <td class="title" width="15%">負責人<br>核章</td>
                        <td></td>
                    </tr>
                </table>
            </div>
            <div class="form_body">
                <h3>二、人為介入及處理情形</h3>
                <p>通報月份：<span>109</span>年<span>4</span>月</p>
                <table>
                    <tr>
                        <th width="5%">項次</th>
                        <th width="20%">日期/時間/地點</th>
                        <th width="12%">實驗載具</th>
                        <th>介入原因</th>
                        <th>處理情形</th>
                        <th>檢討與改進</th>
                    </tr>
                    <tr>
                        <td class="no">1</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                   
                </table>
                <p>(如表格不敷使用，請另增列表填寫)</p>
                <ol>
                    <li>上述通報資料，請於次月5日前，傳真至經濟部技術處無人載具科技創新實驗計畫辦公室，傳真號碼：02-2396-8026</li>
                    <li>本項表單可於無人載具科技創新沙盒網頁之「計畫申請」下載(https://www.uvtep.org.tw/)</li>
                </ol>
            </div>
        </div>
    </body>
</html>
`;
const options = { format: "A4",
    paginationOffset: 1, 
    "footer": {
        "height": "15mm",
        "contents": {
            default: `
            <div style="font-size: 16px;color: #444;text-align:center;display:block;">
            <span >{{page}}</span>/<span >{{pages}}</span>
            </div>`
        }
    }   
};
function testBuffer() {
    return new Promise(( resolve, reject ) => {
        pdf.create(html,options).toBuffer(function(err, buffer){
            if (err) return reject(err);
            //console.log(res); // { filename: '/app/businesscard.pdf' }
            let buf = Buffer.from(buffer);
            console.log(buf);
            return resolve("data:application/pdf;base64,"+buf.toString("base64"));
            // return resolve(buf);
        });
		
    });
} 
async function testBig(){
    let a = Buffer.from(fs.readFileSync("C:\\Users\\10611023\\Videos\\Captures\\123.mp4"));
    console.log(a);
    return a;
}
module.exports = {
    /**
     *
     *
     * @param {String} text
     * @returns {String} result
     */
    getRouteExample:async(text)=>{
        try {
            
            let data = await testBig();
            console.log(text);
            return data;            
        } catch (error) {
            throw error;
        }
    },
    
};
