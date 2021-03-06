/**
 * Created by Administrator on 2016/5/18.
 */

var sha1=require('sha1');
var Wechat=require('./wechat');
var getRawBody=require('raw-body');
var util=require('./util');

module.exports=function(opt,handler){
    var wechat=new Wechat(opt);
    return function *(next){
        var that=this;
        var token=opt.token;
        var signature=this.query.signature;
        var nonce=this.query.nonce;
        var timestamp=this.query.timestamp;
        var echostr=this.query.echostr;
        var str=[token,timestamp,nonce].sort().join('');
        var sha=sha1(str);
        console.log(this.method);
        if(this.method==='GET'){
            console.log('get here');
            if(sha===signature){
                this.body=echostr+'';
            }
            else{
                this.body='wrong';
            }
        }
        else if(this.method==='POST'){
            console.log('post here');
            if(sha!==signature){
                console.log('post here wrong');
                this.body='wrong';
                return false;
            }
            console.log('post here 1111111111');
            var data=yield getRawBody(this.req,{
                length:this.length,
                limit:'1mb',
                encoding:this.charset
            });

            var content=yield util.parseXMLAsync(data);
            console.log(content);

            console.log('处理对象...');

            var message=util.formatMessage(content.xml);

            console.log(message);

            this.weixin=message;

            console.log(this.weixin);

            yield handler.call(this,next);

            wechat.reply.call(this);

        }


    }
}