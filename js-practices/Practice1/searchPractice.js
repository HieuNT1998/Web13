'use strict'

function search(input, target) {
    var vitri=-1;
    for(var i=0;i<input.length;i++){
	if(input[i]==target) vitri=i;
    }
    return vitri;
}

module.exports = search
