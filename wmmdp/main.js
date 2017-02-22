function isThat(){
	if(!passGood(document.getElementById("pass"))) return false;
	
	var n = Number(getCookie("nTry"))+1;
	setCookie("nTry",n,900);
	nTry();
	
	var nT = Number(getCookie("nTry"));
	var value = document.getElementById("pass").value;
	if(krypt(value) == "c7f97f6b2384a35cb84996e244ca29418a964ffe"){
		document.getElementsByTagName("body")[0]
				.innerHTML = "bon bas la j'ai rien a dire tu l'a trouver...";
	}else if( (nT%10 == 0) && nT > 0){
		document.getElementsByTagName("body")[0]
				.innerHTML = "BRAVO MON Mot de passe est bien " + 
							  document.getElementById("pass").value + " ;)";
		setInterval(function (){
		window.location="https://www.youtube.com/watch?v=dQw4w9WgXcQ";
		},500);	
	}else document.getElementById("pass").value ="";
	return false;
}

function nTry(){
	if(getCookie("nTry") == ""){
		setCookie("nTry", 0,900)
	}
	
	var i = 0;
	setInterval(function (){
		document.getElementById("nTry").innerHTML = "<p>tu a essayer "+i+" fois</p>";
		if( i < Number(getCookie("nTry"))) i++;
	},20);
}

function passGood(field){
	if(field.value == ""){
		field.style.border = "1px solid #FF007F";
		return false;
	}
	return true;
}
