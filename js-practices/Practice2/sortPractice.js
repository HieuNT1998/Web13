'use strict'

function sort(input) {
    for(var i=0;i<input.length;i++){
	var vitri=i;
	for(var j=i+1;j<input.length;j++){
	    if(input[j]<input[vitri]){
		vitri=j;
	    }
	}
	var k=input[i];
	input[i]=input[vitri];
	input[vitri]=k;
    }
    return input;
}

module.exports = sort
