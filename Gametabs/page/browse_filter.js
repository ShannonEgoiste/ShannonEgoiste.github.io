function browseFilter(filter,page=1){
	const browse = document.querySelector(".template-browse").content.cloneNode(true);
	browse.querySelector(".letter").remove();
	
	var table = browse.querySelector(".table-area table");
	var thead = table.createTHead().insertRow();
	var labelName = thead.insertCell(); labelName.innerHTML ="Song Title";
	var labelGames = thead.insertCell(); labelGames.innerHTML ="Game";
	var labelStyle = thead.insertCell(); labelStyle.innerHTML = "Style";
	var labelComposer = thead.insertCell(); labelComposer.innerHTML = "Composer";
	var labelTabber = thead.insertCell(); labelTabber.innerHTML = "Tabber";
	var tbody = table.createTBody();
	
	var queryFilter = new URLSearchParams(filter).toString();

	fetch("https://corsproxy.io/?"+encodeURIComponent("https://api.gametabs.net/tabs/?"+queryFilter+"&page_size=20&page="+page)).then((res)=>{
		return res.json();
	}).then((data)=>{
		console.log(data);
		
		var title = "";
		
		if(filter.games){
			title = data.results[0].game.name;
		}else if(filter.composers){
			data.results[0].composers.forEach(element => {
				if(element.id == filter.composers) title = element.name;
			});
		}else if(filter.users){
			title = data.results[0].user.username;
		}else if(filter.styles){
			data.results[0].styles.forEach(element => {
				if(element.id == filter.styles) title = element.name;
			});
		}
		
		title+=" Tabs";
		browse.querySelector(".browse-name").innerHTML = title;
		setTitle(title);

		data.results.forEach((e)=>{
			var row = tbody.insertRow();
			var name = row.insertCell();
			var game = row.insertCell();
			var style = row.insertCell();
			var composer = row.insertCell();
			var tabber = row.insertCell();

			name.innerHTML = "<a href='?tab="+e.slug+"'>"+e.name+"</a>"+"<span class='instrument'>"+e.instruments.map(e => "<span class='instrument-"+e.name+"'>("+e.name+")</span>").join(", ")+"</span>";
			game.innerHTML = "<a href='?games="+e.game.id+"'>"+e.game.name+"</a>";
			style.innerHTML = e.styles.map(e => "<a href='?styles="+e.id+"'>"+e.name+"</a>").join(", ");
			composer.innerHTML = e.composers.map(e => "<a href='?composers="+e.id+"'>"+e.name+"</a>").join(", ");
			tabber.innerHTML = "<a href='?users="+e.user.id+"'>"+e.user.username+"</a>";
		});


		var nbPage = Math.ceil(data.count/20);
		browse.querySelector(".pagination").innerHTML = pagination("?"+queryFilter+"&page_size=20",page,nbPage);

		content.innerHTML = "";
		content.appendChild(browse);
	});
}
