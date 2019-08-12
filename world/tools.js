function showAll(world){
	var d = "<table><tr><th>name</th><th>capitale</th><th>flag</th><th>emblem</th></tr>";
	for(var i = 0; i < world.length;i++){
		if(world[i]["nom"] == "") continue;
		d+="<tr><th>"+world[i]["nom"]+"</th>";
		d+="<th>"+world[i]["capitale"]+"</th>";
		d+="<th><img height='100px' src='https://upload.wikimedia.org/wikipedia/commons/"+world[i]["drapeau"]+"'></img></th>";
		d+="<th><img height='100px' src='https://upload.wikimedia.org/wikipedia/"+world[i]["armoirie"]+"'></img></th>";
		d+="</tr>";
	}
	d+="</table>";
	$("body").html(d);
}

function rand(min,max) {
	min = Math.ceil(min);
	return Math.floor(Math.random() * (Math.floor(max) - min)) + min;
}

Array.prototype.shuffle = function() {
	for (var i = this.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));var temp = this[i];this[i] = this[j];this[j] = temp;
	}
	return this;
}

Array.prototype.lengthsubempty = function(sub){
	for(var i =0 ; i < this.length;i++){
		if(this[i][sub] == "") return i;
	}
	return this.length;
}

Array.prototype.getSubArray = function(sub){
	var subarray = [];
	for(var i = 0; i < this.length;i++){
		var name = this[i][sub];
		for(var j = 0 ; j < name.length;j++){
			if(!subarray.includes(name[j]))
				subarray.push(name[j]);
		}
	}
	return subarray;
}


String.prototype.UCFirst = function(){
	return this.charAt(0).toUpperCase() + this.slice(1);
}