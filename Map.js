
	class Map{
		constructor(width, height) {
    		this.height = height;
    		this.width = width;
    		this.listCases = new Array();
    		this.nourriture = false;
 		}
 		create_map(){
			$("#map").append("<table id='table'>");
			for(var i = 0; i < this.height; i++){
				this.listCases[i] = new Array();
				$("#table").append("<tr id='row"+i+"'></tr>");
				for(var u = 0; u < this.width; u++){
					if(u == 0 || u == this.width-1 || i == 0 || i == this.height-1){
						$("#row"+i).append("<td class='case mur' id='map["+i+"]["+u+"]'>||</td>");
						this.listCases[i][u] = new Case('BLOCK', i, u);
					}
					else if(u == 1 && i == 1){
						$("#row"+i).append("<td class='case fourmilliere' id='map["+i+"]["+u+"]'>F</td>");
							this.listCases[i][u] = new Case('FOURMILLIERE', i, u);
					}
					else{ 
						var randomnumber = Math.floor(Math.random() * (8 + 1) + 0);
						if(randomnumber == 8 ){
							var randomnb = Math.floor(Math.random() * (10 + 1) + 0);
							if(randomnb <= 0 && this.nourriture == false){
								$("#row"+i).append("<td class='case nourriture' id='map["+i+"]["+u+"]'>N</td>");
								this.listCases[i][u] = new Case('FOOD', i, u);
								this.nourriture = true;
							}
							else{
								$("#row"+i).append("<td class='case point' id='map["+i+"]["+u+"]'>.</td>");
								this.listCases[i][u] = new Case('VIDE', i, u);
							}
						}
						else if (randomnumber > 0 && randomnumber < 9){
							$("#row"+i).append("<td class='case point' id='map["+i+"]["+u+"]'>.</td>");
							this.listCases[i][u] = new Case('VIDE', i, u);
						}
						else {
							$("#row"+i).append("<td class='case mur' id='map["+i+"]["+u+"]'>||</td>");
							this.listCases[i][u] = new Case('BLOCK', i, u);
						}
					}
				}
			}
			if(this.nourriture == false){
				location.reload();
			}
		}
	}



	$("#map").empty();
	width = 10;
	height = 10;
	var map = new Map(width, height);
	map.create_map();
	for(var j = 0; j <=32; j++){
		var fourmi = new Ant(map);
	}

			
