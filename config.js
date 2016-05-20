/**
 * Created by Administrator on 2016/5/19.
 */
'use strict'
var path=require('path');
var util=require('./libs/util');
var wechat_file=path.join(__dirname,'./config/wechat.txt');
var config={
    wechat:{
        appID:'wx1cdfcc95bdda50d0',
        appSecret:'2eb95a98a1d32777c20a272373d434fb',
        token:'bishengbisheng',
        getAccessToken:function(){
            return util.readFileAsync(wechat_file);
        },
        saveAccessToken:function(data){
            data=JSON.stringify(data);
            console.log(wechat_file);
            return util.writeFileAsync(wechat_file,data);
        }
    }
}

module.exports=config;