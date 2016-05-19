/**
 * Created by Administrator on 2016/5/19.
 */
var gen=function*(n){
    for(var i=0;i<3;i++){
        n++;

        yield n;

    }
}

var genObject=gen(2);

console.log(genObject.next());
console.log(genObject.next());
console.log(genObject.next());
console.log(genObject.next());