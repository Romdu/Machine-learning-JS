class Case{
	constructor(type, posx, posy, pheromoneV1 = 0, pheromoneV2 = 0){
	   	this.posy = posy;
 		this.posx = posx;
 		this.type = type;
  		this.pheromoneV1 = pheromoneV1;
  		this.pheromoneV2 = pheromoneV2;
  		if(this.type == "FOOD"){
  			this.foodLeft = 100;
  		}
  		else if(this.type == "FOURMILLIERE"){
  			this.stockage = 0;
  		}
	  	else{
	  		this.foodLeft = -1;
	  	}
	}
}