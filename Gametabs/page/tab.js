var tabText = "";
function loadTabFromSlug(slug){
	fetch("https://corsproxy.io/?"+encodeURIComponent("https://api.gametabs.net/tabs/from_slug/"+slug+"/")).then((res)=>{
		return res.json();
	}).then((data)=>{
		console.log(data);
		const tab = document.querySelector(".template-tab").content.cloneNode(true);

		var tabName = data.name + " ("+data.game.name+") "+data.instruments.map(x=> x.name).join(", ")+" Tab";
		var submitted_date = new Date(data.created_at);
		var composers = [];
		var styles = [];
		data.composers.forEach(element => { composers.push("<a href='?composers="+element.id+"'>"+element.name+"</a>"); });
		data.styles.forEach(element => { styles.push("<a href='?styles="+element.id+"'>"+element.name+"</a>"); });

		tab.querySelector(".tab-area").innerHTML = tabText = data.text;
		tab.querySelector(".tab-title").innerHTML = tabName;
		tab.querySelector(".tab-date").innerHTML = submitted_date.toLocaleDateString('en-GB', {day:"2-digit",month:"long",year:"numeric"});
		tab.querySelector(".tab-arranger").innerHTML = data.user.username;
		tab.querySelector(".tab-arranger").href = "?users="+data.user.id;
		tab.querySelector(".tab-game").innerHTML = data.game.name;
		tab.querySelector(".tab-game").href = "?games="+data.game.id;

		tab.querySelector(".tab-composers").innerHTML =composers.join(", ");
			
		tab.querySelector(".tab-style").innerHTML = styles.join(", ");
		setTitle(tabName);

		content.innerHTML = "";
		content.appendChild(tab);
	});
}


// todo broken
// http://localhost:8000/?tab=theme-of-the-tantalus
//

function parseTab(){
	var nbBarPerLine = Number(document.querySelector("[name=nbBarPerLine]").value);

	var jumpSplit =	tabText.split("\n\n");
	var header = [];
	var tabBar = [];
	var footer = [];

	jumpSplit.forEach(x=>{
		if((x.indexOf("-||") > 0 || x.indexOf("-|-") > 0) && footer.length == 0) tabBar.push(x.split("\n"));
		else if(tabBar.length == 0) header.push(x);
		else footer.push(x);
	});
	
	var maxLength = Math.max(...tabBar.map(x=>x.length));
	tabBar.forEach(e => {
		var padding = maxLength - e.length;
		for(var i = 0 ; i < padding;i++){
			e.unshift("");
		}
		for(var i = 0 ; i < e.length;i++){
			e[i] = e[i].padEnd(Math.max(...e.map(x=>x.length))," ");
		}
	});

	var tabBarMerged = [];
	tabBar.forEach(e=>{
		for(var i = 0; i < e.length;i++){
			if(!tabBarMerged[i]) tabBarMerged[i] = "";
			tabBarMerged[i]+=e[i];
		}
	});

	var measureIndex = [];
	var middleLine = Math.ceil(maxLength/2);
	for(var i = 0 ; i < tabBarMerged[0].length;i++){
		if(tabBarMerged[middleLine][i] == '|'){
			if(measureIndex[measureIndex.length-1] == i-1)
				measureIndex[measureIndex.length-1] = i;
			else
				measureIndex.push(i);
		}
	}
	measureIndex[0] = -1;
	console.log(tabBarMerged);
	console.log(measureIndex);

	var rebuildedTab = "";
	var end = 0;
	for(var i = 0; i < measureIndex.length; i+=nbBarPerLine){
		var start = measureIndex[i];
		var end = measureIndex[Math.min(i+nbBarPerLine,measureIndex.length-1)];
		tabBarMerged.forEach(x=>{
			rebuildedTab+=x.slice(start+1,end+1)+"\n";
		});
		rebuildedTab+="\n";
	}
	document.querySelector(".tab-area").innerHTML = header.join("\n")+"\n"+rebuildedTab+"\n"+footer.join("\n");
}