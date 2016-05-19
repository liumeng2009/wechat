/**
 * Created by Administrator on 2016/5/19.
 */
'use strict'
var path=require('path');
var util=require('./libs/util');
var wechat_file=path.join(__dirname,'./config/wechat.txt');
var config={
    wechat:{
        appID:'wx81dd9b7eef77b5ec',
        appSecret:'e21a9d82519ca1c85861dbaaa46b47d1',
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