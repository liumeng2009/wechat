/**
 * Created by Administrator on 2016/5/16.
 */
'use strict'

var Koa=require('koa');
var wechat=require('./wechat/g');
var config={
    wechat:{
        appID:'wx81dd9b7eef77b5ec',
        appSecret:'e21a9d82519ca1c85861dbaaa46b47d1',
        token:'bishengbisheng'
    }
}

var app=new Koa();
app.use(wechat(config.wechat));

app.listen(1234);
console.log('Listening:1234');