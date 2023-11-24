function flagSelector(listCountry,cbk){
	var userInput = document.querySelector('.userFlagInput');
	var listCountryDom = document.querySelector(".listCountry");
	var listCountryTable = listCountryDom.querySelector("table > tbody");
	
	listCountry.forEach((x)=>{
		listCountryTable.innerHTML+="<tr data-iso='"+x.i+"' data-name='"+x.n+"'><td><img height='24px' src='svg/"+x.i+".svg'/></td><td>"+x.n+"</td></tr>";
	});
	
	userInput.addEventListener("click",(e)=>{
		listCountryDom.classList.remove('d-none');
		filterList();
	});

	window.addEventListener("click",(e)=>{
		var closestTR = e.target.closest("tr");
		if(closestTR){
			userInput.value = closestTR.dataset.name;
		}
		if(!e.target.classList.contains("userFlagInput")){
			listCountryDom.classList.add("d-none");
		}
	});

	listCountryTable.addEventListener("mousemove",(e)=>{
		var row = e.target.closest("tr")
		if(row){
			var active = document.querySelector("tr.active");
			if(active) active.classList.remove("active");
			row.classList.add("active");
		}
	});


	userInput.addEventListener('keydown',e=>{
		listCountryDom.classList.remove("d-none");
		var dir = undefined;
		if(e.code == "ArrowUp"){
			dir = -1;	
		}else if(e.code == "ArrowDown"){
			dir = 1;
		}else if(e.code == "Enter"){
			e.preventDefault();
			var active = document.querySelector("tr.active:not(.d-none)");
			if(!active) active = document.querySelector("tr:not(.d-none)");
			listCountryDom.classList.add("d-none");
			if(active.dataset)
				userInput.value = active.dataset.name;
			cbk();
		}else if(e.code == "Tab"){
			e.preventDefault();
			var active = document.querySelector("tr.active:not(.d-none)");
			if(!active) active = document.querySelector("tr:not(.d-none)");
			userInput.value = active.dataset.name;
			filterList();
		}

		if(dir){
			e.preventDefault();
			var allVisible = document.querySelectorAll("tr:not(.d-none)");
			var index = -1;
			for(var i = 0 ; i < allVisible.length;i++){
				if(allVisible[i].classList.contains("active")){
					allVisible[i].classList.remove("active");
					index = i;
					break;
				}
			}
			index+=dir;
			if(index < 0 ) index = allVisible.length-1;
			else if(index >= allVisible.length) index = 0;

			var newActive = allVisible[index];
			newActive.classList.add("active");
			newActive.scrollIntoView({behavior:"instant",block:"nearest"});
		}
	});

	userInput.addEventListener('keyup', e => {
		filterList();
	});		

	function filterList(){
		var filter = userInput.value.toLowerCase();
		listCountry.forEach((x)=>{
			var option = listCountryTable.querySelector("[data-iso="+x.i+"]");
			if(filter == "" || filter == undefined || x.n.toLowerCase().indexOf(filter) > -1){
				option.classList.remove("d-none");
			}else{
				option.classList.add("d-none");	
			}
		});
	}
}