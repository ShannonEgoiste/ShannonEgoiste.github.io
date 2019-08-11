$(document).ready(function(){
	/*var listFilm = localStorage['listeFilm'].split(";");
	
	for(var i = listFilm.length; i > 0; i--){
		$("#lastMovie").append("<tr><td><a href='"+listFilm[i-1]+"'>"+listFilm[i-1]+"</a></td></tr>");
	}
	*/
	if($_GET("link")){
		console.log($_GET("link"));
		$("#movieUrl").val($_GET("link"));
		launchMovie();
	}
});

$( window ).resize(function() {
	resizeFrame();
});

function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}

function resizeFrame(){	
	var sizeX = $(window).width();
	var sizeY = Math.ceil($(window).width()*0.5625+10);
	
	if(sizeY > $(window).height()){
		sizeY = $(window).height();
		sizeX = sizeY*(16.0/9);
	}

	
	$("#vidFrame").attr("height",sizeY+"px");
	$("#vidFrame").attr("width",sizeX+"px");
	
	var offsetX = ($(window).width()/2)-sizeX/2;
	var offsetY = ($(window).height()/2)-sizeY/2;
	
	$("#info").css({marginLeft:offsetX+"px",
					marginTop:offsetY+"px"});
}

function launchMovie(){
	var link = $("#movieUrl").val();
	console.log(link);
	$("body").html(" ");
	$("body").append('<div id="info" >');
	
	$("#info").append('<iframe id="vidFrame" src="https://uptostream.com/iframe/'+link+'" frameborder="0" scrolling="no"></iframe>');
	addElement("https://uptostream.com/iframe/"+link);	
	
	//$("#info").append('<iframe id="vidFrame" src="'+link+'" frameborder="0" scrolling="no"></iframe>');
	//addElement(link);	
	
	resizeFrame();	
}

function addElement(nom){
	/*var listFilm = localStorage['listeFilm'].split(";");
	if(listFilm.length > 100){
		listFilm.splice(0,1);
	}
	listFilm.push(nom);
	localStorage['listeFilm'] = listFilm.join(";");*/
}