function Ant(map){

	this.life = 3;
	this.mouv = 0;
	this.map = map;
	this.myAntPosY = 1;
	this.myAntPosX = 1;
	this.exploration = 0.8;
	this.confiance = 0.5;
	this.evaporation = 0.9999;
	this.bruit = 0.7;
	this.have = 0;
	this.name = "";

	this.allCase = function(){
		var direction = [];
		direction[1] = this.map.listCases[this.myAntPosX][this.myAntPosY-1]; //left
		direction[2] = this.map.listCases[this.myAntPosX][this.myAntPosY+1]; //right
		direction[3] = this.map.listCases[this.myAntPosX-1][this.myAntPosY]; //up
		direction[4] = this.map.listCases[this.myAntPosX+1][this.myAntPosY]; //down
		if(this.have == 0){
			this.addPheroV1(direction);
			this.checkFood(direction);
		}
		else{
			this.addPheroV2(direction);
			this.checkBase(direction);
		}
	}
	
	this.checkFood = function(direction){
		possibility = [];
		findf = false;
		var fourmie = this;
		direction.forEach( function(value, key) {
      		if(value.type == "VIDE"){
      			possibility.push(key);
      		}
      		else if(value.type == "FOOD"){
      			findf = true;
      			value.pheromoneV1 = 1;
      			value.foodLeft -= 1;
      			fourmie.have = 1;
      			if(value.foodLeft == 0){
      				value.type = "VIDE";
      				$(".nourriture").append(".");
      				$(".nourriture").toggleClass("point");
      				$(".nourriture").removeClass("nourriture");
      			}
      			//console.log("FOODLEFT===>"+value.foodLeft);
      		}
		});
		var nb_pour = Math.floor(Math.random() * (9 + 1) + 0);
		var max_phero = "ntm";
      	if(nb_pour >= (this.exploration*10)-1){
      		var nb = 0;
      		possibility.forEach( function(value){
      			if(direction[value].pheromoneV1 > nb){
      				nb = direction[value].pheromoneV1;
      				max_phero = value;
      			} 
      		})
      		if(max_phero != "ntm"){
      			possibility = [];
      			possibility.push(max_phero);
      		}
      	}
		if(findf == false){
			this.choiceCase(possibility, direction);
		}
		else{
			var fourmie = this;
			setTimeout(function(){
				fourmie.allCase();
			},100);
		}
	}

	this.checkBase = function(direction){
		possibility = [];
		findfour = false;
		var fourmie = this;
		direction.forEach( function(value, key) {
      		if(value.type == "VIDE"){
      			possibility.push(key);
      		}
      		else if(value.type == "FOURMILLIERE"){
      			findfour = true;
      			value.pheromoneV2 = 1;
      			value.stockage += 1;
      			fourmie.have = 0;
      			fourmie.life -= 1;
      			console.log(value.stockage);
      			if(value.stockage == 99){
      				console.log("yo");
      				fourmie.life += 1;
      				fourmie.exploration = 0;
      				fourmie.confiance = 0;
      				fourmie.name = "fourmie final";
      			}
      			//console.log("STOCKAGE===>"+value.stockage);
      			//console.log(value.pheromoneV2);
      		}
		});
		if(fourmie.life == 0){
      		document.getElementById('map['+this.myAntPosX+']['+this.myAntPosY+']').innerText = ".";
      		return;
		}
		/*if(this.life == 0){
		delete fourmi;
		console.log(this.life);
	}*/

		var nb_pour = Math.floor(Math.random() * (9 + 1) + 0);
		var max_phero = "ntm";
      	if(nb_pour >= (this.confiance*10)-1){
      		var nb = 0;
      		possibility.forEach( function(value){
      			if(direction[value].pheromoneV2 > nb){
      				nb = direction[value].pheromoneV2;
      				max_phero = value;
      			} 
      		})
      		if(max_phero != "ntm"){
      			possibility = [];
      			possibility.push(max_phero);
      		}
      	}
		if(findfour == false){
			this.choiceCase(possibility);
		}
		else{
			var fourmie = this;
			setTimeout(function(){
				fourmie.allCase();
			},100);
		}
	}

	this.choiceCase = function(possibility){
		var p = possibility.length;
		//console.log(p);
		//console.log(this.mouv)
		var choice = Math.floor(Math.random() * (p + 1) + 0);
		if(this.mouv != 0){
			document.getElementById('map['+this.myAntPosX+']['+this.myAntPosY+']').innerText = ".";
		}
		if(possibility[choice] == 1){
			this.myAntPosY = this.myAntPosY-1;
			this.myAntPosX = this.myAntPosX;
		}
		else if(possibility[choice] == 2){
			this.myAntPosY = this.myAntPosY+1;
			this.myAntPosX = this.myAntPosX;
		}
		else if(possibility[choice] == 3){
			this.myAntPosY = this.myAntPosY;
			this.myAntPosX = this.myAntPosX-1;
		}
		else if(possibility[choice] == 4){
			this.myAntPosY = this.myAntPosY;
			this.myAntPosX = this.myAntPosX+1;
		}
		this.mouv++;
		this.antmouv();
	}

	this.antmouv = function(){
		document.getElementById('map['+this.myAntPosX+']['+this.myAntPosY+']').innerText = "o";
		//console.log(this.map.listCases[this.myAntPosX][this.myAntPosY]);
		var fourmie = this;
		setTimeout(function(){
			fourmie.allCase();
		},100);
	}

	this.addPheroV1 = function(direction){
		this.map.listCases[this.myAntPosX][this.myAntPosY].pheromoneV1 = this.evaporation*(this.bruit*this.maxPheroV1(direction)+(1-this.bruit) * this.avgPheroV1(direction));
		if(this.name == "fourmie final"){
			document.getElementById('map['+this.myAntPosX+']['+this.myAntPosY+']').style = "background: url(./img/rouge.png) no-repeat 0% bottom";
		}
		//console.log("PhéromoneV1===>"+this.map.listCases[this.myAntPosX][this.myAntPosY].pheromoneV1);
	}

	this.addPheroV2 = function(direction){
		this.map.listCases[this.myAntPosX][this.myAntPosY].pheromoneV2 = this.evaporation*(this.bruit*this.maxPheroV2(direction)+(1-this.bruit) * this.avgPheroV2(direction));
		if(this.name == "fourmie final"){
			document.getElementById('map['+this.myAntPosX+']['+this.myAntPosY+']').style = "background: url(./img/bleu.png) no-repeat 50% top";
		}
		//console.log("PhéromoneV2===>"+this.map.listCases[this.myAntPosX][this.myAntPosY].pheromoneV2);
	}

	this.maxPheroV1 = function(array){
		var max = 0;
		array.forEach( function(val, key) {
			if(val.pheromoneV1 > max){
				max = val.pheromoneV1;
			}
		});
		return max;
	}

	this.avgPheroV1 = function(array){
		var totalPhero = 0;
		array.forEach( function(val, key) {
			totalPhero += val.pheromoneV1;
		});
		return totalPhero/4;
	}

	this.maxPheroV2 = function(array){
		var max = 0;
		array.forEach( function(val, key) {
			if(val.pheromoneV2 > max){
				max = val.pheromoneV2;
			}
		});
		return max;
	}

	this.avgPheroV2 = function(array){
		var totalPhero = 0;
		array.forEach( function(val, key) {
			totalPhero += val.pheromoneV2;
		});
		return totalPhero/4;
	}
	this.allCase();
}  
