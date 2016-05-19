/**
 * Created by Administrator on 2016/5/16.
 */
'use strict'

var Koa=require('koa');
var path=require('path');
var wechat=require('./wechat/g');
var util=require('./libs/util');
var wechat_file=path.join(__dirname,'./config/wechat.txt');
var config=require('./config');
var weixin=require('./weixin');

var app=new Koa();
app.use(wechat(config.wechat,weixin.reply));

app.listen(1234);
console.log('Listening:1234');