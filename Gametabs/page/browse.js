function browsePerLetter(letter = "~",page=1){
	const browse = document.querySelector(".template-browse").content.cloneNode(true);
	var alphabet = ["~",".","A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
		"K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
		"U", "V", "W", "X", "Y", "Z"];
	var letterArea = browse.querySelector(".letter");
	letterArea.innerHTML = alphabet.reduce((a,l)=>a+"<a class='btn "+(l==letter?"active":"")+"' href='/?browse=game&q="+l+"'>"+l+"</a>","");
	letter = letter=="~"?"0":(letter=="."?"other":letter);
	var title = letter=="0"?"All games":"Games beginning with "+letter;
	browse.querySelector(".browse-name").innerHTML = title;
	setTitle(title);

	var table = browse.querySelector(".table-area table");
	var thead = table.createTHead().insertRow();
	var labelName = thead.insertCell();
	var labelNbTab = thead.insertCell();
	labelName.innerHTML ="Games";
	labelNbTab.innerHTML = "# of tabs";
	var tbody = table.createTBody();

	fetch("https://corsproxy.io/?"+encodeURIComponent("https://api.gametabs.net/games/?page="+page+"&page_size=20&starts_with="+letter)).then((res)=>{
		return res.json();
	}).then((data)=>{
		console.log(data);
		data.results.forEach((e)=>{
			var row = tbody.insertRow();
			var name = row.insertCell();
			var nbTab = row.insertCell();
			name.innerHTML = "<a href='?games="+e.id+"'>"+e.name+"</a>";
			nbTab.innerHTML = e.tab_count;
		});

		var nbPage = Math.ceil(data.count/20);
		browse.querySelector(".pagination").innerHTML = pagination("/?browse=game&q="+letter,page,nbPage);

		content.innerHTML = "";
		content.appendChild(browse);
	});
}