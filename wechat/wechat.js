/**
 * Created by Administrator on 2016/5/18.
 */
'use strict'

var sha1=require('sha1');
var Promise=require('bluebird');
var request=Promise.promisify(require('request'));
var tpl=require('./tmp');
var util=require('./util');
var fs=require('fs');
var prefix='https://api.weixin.qq.com/cgi-bin/';
var api={
    accessToken:prefix+'token?grant_type=client_credential',
    upload:prefix+'media/upload?type'
}

function Wechat(opts){
    var that=this;
    this.appID=opts.appID;
    this.appSecret=opts.appSecret;
    this.getAccessToken=opts.getAccessToken;
    this.saveAccessToken=opts.saveAccessToken;
    this.fetchAccessToken();

}

Wechat.prototype.isValidAccessToken=function(data){
    if(!data||!data.access_token||!data.expores_in){
        return false;
    }

    var access_token=data.access_token;
    var expires_in=data.expires_in;
    var now=(new Date().getTime());

    if(now<expires_in){
        return true;
    }
    else{
        return false;
    }
}
Wechat.prototype.updateAccessToken=function(){
    var appID=this.appID;
    var appSecret=this.appSecret;
    var url=api.accessToken+'&appid='+appID+'&secret='+appSecret;
    console.log(url);
    return new Promise(function(resolve,reject){
        request({
            url:url,
            json:true
        }).then(function(response){
            var data=response.body;
            var now=(new Date().getTime());
            var expires_in=now+(data.expires_in-20)*1000;
            data.expires_in=expires_in;
            resolve(data);
        });
    });

}

Wechat.prototype.reply=function(){
    var content=this.body;
    var message=this.weixin;
    var xml=util.tpl(content,message);
    this.status=200;
    this.type='application/xml';
    this.body=xml;
}

Wechat.prototype.fetchAccessToken=function(){
    var that=this;
    console.log('fetch accesstoken');
    if(this.access_token&&this.expires_in){
        if(this.isValidAccessToken(this)){
            console.log('直接return');
            return Promise.resolve(this);
        }
    }

    return this.getAccessToken()
        .then(function(data){
            try{
                data=JSON.parse(data);
            }
            catch(e){
                return that.updateAccessToken();
            }
            if(that.isValidAccessToken(data)){
                Promise.resolve(data);
            }
            else{
                return that.updateAccessToken();
            }
        })
        .then(function(data){
            that.access_token=data.access_token;
            that.expires_in=data.expires_in;
            that.saveAccessToken(data);
            console.log('取得的token是：'+data);
            return Promise.resolve(data);
        });
}


Wechat.prototype.uploadMaterial=function(type,filepath){
    var that=this;
    var form={
        access_token:this.access_token,
        type:'image',
        media:fs.createReadStream(filepath)
    };
    return new Promise(function(resolve,reject){

        console.log('我要的结果是'+that.fetchAccessToken());

        that
            .fetchAccessToken()
            .then(function(data){
                var url=api.upload+'&access_token='+data.access_token+'&type='+type
                request({method:'POST',url:url,formData:form,json:true}).then(function(response){
                    var _data=response.body;
                    console.log(_data);
                    if(_data){
                        resolve(_data);
                    }
                    else{
                        throw new Error('Upload material fails');
                    }

                }).catch(function(err){
                    console.log('发生错误了：'+err);
                    reject(err);
                });
            })
    });


    var content=this.body;
    var message=this.weixin;
    var xml=util.tpl(content,message);
    this.status=200;
    this.type='application/xml';
    this.body=xml;
}



module.exports=Wechat;

