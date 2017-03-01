var url;

function loadPhoto(){
	url = document.getElementById("url").value;
	document.getElementById("photo").innerHTML = null;
	document.getElementById("photo").style.backgroundImage = "url("+url+")";
}

function labRang(v){
	if(v==0){
		document.getElementById("ri").innerHTML = tD(document.getElementById("infect").value); 
		
	}else{
		document.getElementById("rs").innerHTML = tD(document.getElementById("stress").value);
	}
}

function tD(val){
	if(val <10) return "0"+val;
	return val;
}

function saveData(){
	var personne = []; 
	personne.push(document.getElementById("nom").value);
	personne.push(document.getElementById("prenom").value);
	personne.push(url);
	personne.push(document.getElementById("infect").value);
	personne.push(document.getElementById("stress").value);
	personne.push(document.getElementById("club").value);
	personne.push(document.getElementById("sport").value);
	personne.push(document.getElementById("cuis").value);
	personne.push(document.getElementById("meta").value);
	personne.push(document.getElementById("intel").value);
	personne.push(document.getElementById("phys").value);
	personne.push(document.getElementById("perc").value);
	personne.push(document.getElementById("tech").value);
	personne.push(document.getElementById("soc").value);
	return personne;
}

function saveText(){
	winText();
	document.getElementById("saveLoadText").innerHTML+= "<div id=\"margSavTex\"></div>";
	var personne = saveData();
	for(var i=0;i< personne.length;i++){
	var info = personne[i];
	if(info == null || info.length <1) info = " ";
	if(i<personne.length-1) info+=";";
	document.getElementById("textboxsl").innerHTML+=(info);
	}
}

function winCreate(){
	var x = document.getElementById("saveLoadText");
	x.innerHTML = null;
	x.innerHTML+= "<a id=\"closeB\" onclick=\"closeSave()\">X</a></br>";
}

function winText(){
	winCreate();
	var x = document.getElementById("saveLoadText");
	x.innerHTML+= "<textarea autofocus rows=\"10\" cols=\"40\" id=\"textboxsl\"></textarea></br>";
}

function reinitPhoto(){
	document.getElementById("photo").innerHTML="<input type=\"text\" id=\"url\" placeholder=\"url Image\">";
	document.getElementById("photo").innerHTML+="<input type=\"button\" id=\"submit\" value=\"envoyer\" onclick=\"loadPhoto()\">";							
}

function reset(){
	winCreate();
	document.getElementById("saveLoadText").innerHTML+="<input type=\"button\" id=\"confirme\" value=\"confirmer ?\" onclick=\"confirmeReset()\">";
}

function confirmeReset(){
	closeSave();
	reinitPhoto();
	var tab = [];
	tab[0] = "";
	tab[1] = "";
	tab[3] = 0;
	tab[4] = 0;
	tab[5] = "";
	tab[6] = "";
	tab[7] = "";
	tab[8] = "";
	tab[9] = 50;
	tab[10] = 50;
	tab[11] = 50
	tab[12] = 50
	tab[13] = 50;
	dataSet(tab);
}

function closeSave(){
	document.getElementById("saveLoadText").innerHTML = null;
}

function loadText(){
	winText();
	document.getElementById("saveLoadText").innerHTML+="<input type=\"button\" value=\"Charger\" onclick=\"submitLoad()\">"
}

function submitLoad(){
	var tab = document.getElementById("textboxsl").value.split(";");
	for(var i = 0 ; i < tab.length; i++){
		console.log(tab[i]);
	}
	
	dataSet(tab);
	closeSave();
}

function dataSet(tab){
	document.getElementById("nom").value = tab[0];
	document.getElementById("prenom").value = tab[1];
	
	reinitPhoto();
	if(tab[2] != "" && tab[2] != null){
	document.getElementById("url").value = tab[2];
	loadPhoto();
	}
	
	document.getElementById("infect").value = tab[3];
	labRang(0);
	document.getElementById("stress").value = tab[4];
	labRang(1);
	document.getElementById("club").value = tab[5];
	document.getElementById("sport").value = tab[6];
	document.getElementById("cuis").value = tab[7];
	document.getElementById("meta").value = tab[8];
	document.getElementById("intel").value = tab[9];
	document.getElementById("phys").value = tab[10];
	document.getElementById("perc").value = tab[11];
	document.getElementById("tech").value= tab[12];
	document.getElementById("soc").value = tab[13];
}

function saveCookie(){
	winCreate();
	var x = document.getElementById("saveLoadText");
	x.innerHTML+="<input type=\"button\" id=\"confirme\" value=\"confirmer ?\" onclick=\"confirme()\">"
}

function confirme(){
	closeSave();
	var personne = saveData();
	for(var i=0;i< personne.length;i++){
	var info = personne[i];
	if(info == null || info.length <1) info = " ";
	if(i<personne.length-1) info+=";";
		setCookie("JdRInfo"+tD(i),info,9000);
	}
}

function loadCookie(){
	winCreate();
	var x = document.getElementById("saveLoadText");
	x.innerHTML+="<input type=\"button\" id=\"confirme\" value=\"confirmer ?\" onclick=\"confirmeLoad()\">"
}

function confirmeLoad(){
	closeSave();
	var tab = [];
	for(var i=0;i< 14;i++){
		tab[i] = getCookie("JdRInfo"+tD(i));
	}
	dataSet(tab);
}


function autoCharge(){
	if(checkCookie("JdRInfo00")){
		confirmeLoad();
	}
}
