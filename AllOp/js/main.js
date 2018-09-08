$(document).ready(function(){ // point de démmarage JS
	var url = "https://raw.githubusercontent.com/Aghathis/Aghathis.github.io/master/AllOp/Image/";
	for(i in allGundamOp){
		var anime = allGundamOp[i];
		var str = "<div id='animeCard' style='position:relative;padding:50px;'>";
		str+="<div id='image'";
		str+="style='z-index:-10;position:absolute;top:0;left:0;right:0;bottom:0;background-size:cover;";
		str+="filter:blur(5px) brightness(50%);background-image:url(\""+url+anime.image+"\");'></div>";
		str+= "<div id='animeTitle'> - "+anime.anime+" - </div><div id='anime'>";
		for(j in anime.song){
			var song = anime.song[j];
			str+="<div id='song'>";
			str+="<div id='title'>"+song.title;
			str+=" <span id='artist'>by "+song.artist+"</span></div>";
			str+="<div id='lyrics'>"+song.lyrics+"</div>";
			str+="</div>";
		}
		str+="</div>"+"</div>";
		$("#content").append(str);
	}




});
