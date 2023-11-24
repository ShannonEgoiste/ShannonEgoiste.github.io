var DEFAULT_CANVAS_HEIGHT = 160;
function getCanvas(selector){
	var w ={canvas:document.querySelector(selector),ctx:undefined};
	w.ctx = w.canvas.getContext("2d",{willReadFrequently:true});
	w.canvas.height = DEFAULT_CANVAS_HEIGHT;
	return w;
}

var nbPixel = 0;

var ref = getCanvas(".ref");
var w = getCanvas(".working");
var mask = getCanvas(".mask");
function init(iso){
	var img = new Image();
	img.src = "svg/"+iso+".svg";
	img.onload = ()=>{
		mask.canvas.width = w.canvas.width = ref.canvas.width = DEFAULT_CANVAS_HEIGHT*(img.naturalWidth/img.naturalHeight);
		ref.ctx.clearRect(0,0,ref.canvas.width,DEFAULT_CANVAS_HEIGHT);
		w.ctx.clearRect(0,0,ref.canvas.width,DEFAULT_CANVAS_HEIGHT);
		mask.ctx.clearRect(0,0,ref.canvas.width,DEFAULT_CANVAS_HEIGHT);
		ref.ctx.drawImage(img,0,0,ref.canvas.width,ref.canvas.height);
		nbPixel = ref.canvas.width*ref.canvas.height;
	}
}
function compareImage(iso){
	var pixelCounter = 0;
	var img = new Image();
	img.src = "svg/"+iso+".svg";
	//img.onload = ()=>{
		w.ctx.drawImage(img,0,0,ref.canvas.width,ref.canvas.height);
		for(var y = 0; y < ref.canvas.height;y++){
			for(var x = 0; x < ref.canvas.width;x++){
				var a = ref.ctx.getImageData(x,y,1,1).data;
				var b = w.ctx.getImageData(x,y,1,1).data;
				var distance = Math.sqrt(Math.pow(b[0]-a[0],2)+Math.pow(b[1]-a[1],2)+Math.pow(b[2]-a[2],2))
				if(distance < 100){
					mask.ctx.fillStyle = "rgb("+a[0]+","+a[1]+","+a[2]+")";
					mask.ctx.fillRect(x,y,1,1);
					pixelCounter++;
				}
			}
		}
	//}
	return Math.round(100*pixelCounter/nbPixel);
}