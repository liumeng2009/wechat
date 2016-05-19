/**
 * Created by Administrator on 2016/5/19.
 */
'use strict'

exports.reply=function*(next){
    var message=this.weixin;
    console.log('MsgType is:' +message.MsgType);
    if(message.MsgType==='event'){
        console.log('event is:'+message.Event);
        if(message.Event==='subscribe'){
            if(message.EventKey){
                console.log('扫二维码进来：'+message.EventKey+''+messgae.tickket);
            }
            this.body='哈哈，你订阅了这个号'+messgae.MsgId;
        }
        else if(message.Event==='unsubscribe'){
            console.log('无情取关');
            this.body='';
        }
        else if(message.Event==='LOCATION'){
            this.body='您上报的位置是：'+message.latitude+'/'+
                    message.Longitude+'-'+message.Precision;
        }
        else if(message.Event==='CLICK'){
            this.body='您点击了菜单'+message.eventKey;
        }
        else if(message.Event==='SCAN'){
            console.log('关注后扫二维码'+message.EventKey+' '+message.Ticket);
            this.body='看到你扫了一下哦';
        }
        else if(message.Event==='VIEW'){
            this.body='您点击了菜单中的链接：'+message.EventKey;
        }
    }
    else if(message.MsgType==='text'){
        var content=message.Content;
        var reply='额，你说的'+message.Content+'太复杂了';

        if(content==='1'){
            reply='天下第一';
        }
        else if(content==='2'){
            reply='天下第二';
        }
        else if(content==='3'){
            reply='天下第三';
        }
        else if(content==='4'){
            reply=[{
                title:'技术改变世界',
                description:'只是个描述而已',
                picurl:'http://a.hiphotos.baidu.com/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=ca247125708b4710da22f59ea2a7a898/622762d0f703918fd069b4ce533d269759eec47e.jpg',
                url:'https://github.com',
                createTime:new Date().getTime()
            }
            ];
        }
        this.body=reply;
    }

    yield next;
}