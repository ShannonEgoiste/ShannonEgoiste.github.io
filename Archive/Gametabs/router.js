var url = new URL(location.href);

let tab = url.searchParams.get("tab");
let browse = url.searchParams.get("browse");
let filter = {
	games : url.searchParams.get("games"),
	composers : url.searchParams.get("composers"),
	users : url.searchParams.get("users"),
	styles : url.searchParams.get("styles")
};
let page = url.searchParams.get("page")||"1";

let reducedFilter = {};
Object.keys(filter).forEach(key =>{
	if(filter[key]){
		reducedFilter[key] = filter[key];
	}
});

if(tab){
	loadTabFromSlug(url.searchParams.get("tab"));
}else if(Object.keys(reducedFilter).length > 0){
	browseFilter(reducedFilter,Number(page));
}else if(browse){
	let letter = url.searchParams.get("q")||"~";
	browsePerLetter(letter, Number(page));
}else{

}


