'use strict'
function ArrGene(leng){
    var b=Math.floor(Math.random()*100);
    var Arr=[];
    Arr[0]=b;
    for(var i=1;i<leng;i++){
	Arr[i]=Arr[i-1]+1;
    }
    return Arr;
}
function generate(testLengthArray){
    var B=Array.from({length:testLengthArray.length});
    for(var i=0;i<testLengthArray.length;i++){
	var Arr=ArrGene(testLengthArray[i]);
	B[i]={
	    input : Arr,
	    target:-1,
	    output:-1
	    
	}
    }
    B[0].target=B[0].input[0];
    B[0].output=0;
    B[1].target=B[1].input[B[1].input.length-1];
    B[1].output=B[1].input.length-1;
    return B;
}

module.exports = generate
