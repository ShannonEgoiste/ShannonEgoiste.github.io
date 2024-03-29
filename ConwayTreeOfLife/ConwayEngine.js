class ConwayEngine{
	constructor(width,height){
		for(var i = 0 ; i < width*height;i++){
			this.board.push(Math.random()>0.5);
		}
		this.w = width;
	}

	board = [];
	w;	

	addPoint(x,y){
		this.board[x+y*this.w] = true;
	}

	update(){
		var newBoard = [];
		for(var i = 0 ; i < this.board.length;i++){
			var c = {x:(i%this.w),y:Math.floor(i/this.w)};
			var neighbour =
				(this.board[(c.x-1)+this.w*(c.y-1)]??0)+
				(this.board[(c.x-1)+this.w*(c.y+0)]??0)+
				(this.board[(c.x-1)+this.w*(c.y+1)]??0)+
				(this.board[(c.x+0)+this.w*(c.y-1)]??0)+
				(this.board[(c.x+0)+this.w*(c.y+1)]??0)+
				(this.board[(c.x+1)+this.w*(c.y-1)]??0)+
				(this.board[(c.x+1)+this.w*(c.y+0)]??0)+
				(this.board[(c.x+1)+this.w*(c.y+1)]??0);
	
			var alive = (this.board[i] || (neighbour == 3)) & !(neighbour < 2 || neighbour > 3);
			
			newBoard.push(alive);
		}
		this.board = newBoard;
		return this.board;
	}
}

export {ConwayEngine};


